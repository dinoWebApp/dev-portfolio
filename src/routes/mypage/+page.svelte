<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<script>
// @ts-nocheck
  import { goto } from "$app/navigation";
  import axios from "axios";
  import { PUBLIC_IMGHOSTING_URL } from "$env/static/public";

  import { onMount } from "svelte";
  import { redirect } from "@sveltejs/kit";
  
  onMount(()=>{
    let vh = window.innerHeight;
    const handleResize = ()=>{
      vh = window.innerHeight;
    }
    let handler = ()=>{
      if(window.scrollY === 0) {
        aboutMe = false;
        skills = false;
        projects = false;
      } else if(window.scrollY > 0 && scrollSkills.getBoundingClientRect().top > 80){
        aboutMe = true;
        skills = false;
        projects = false;
      } else if(scrollProjects.getBoundingClientRect().top > 80) {
        aboutMe = false;
        skills = true;
        projects = false;
      } else {
        aboutMe = false;
        skills = false;
        projects = true;
      }
    }


    clickMenu = (menu)=>{
      window.scrollTo({
        top: menu.offsetTop,
        behavior : 'smooth'
      });
      toggle = false;
      return null;
    }

    window.addEventListener('scroll', handler);
    window.addEventListener('resize', handleResize);
    return () =>{
      window.removeEventListener('scroll', handler);
      window.addEventListener('resize', handleResize);
    }

  });
  export let data;
  const portfolio = data.portfolio;
  
  let aboutMeData;
  let skillsData;
  let projectsData;
  if(!portfolio) {
    aboutMeData = {
      name : '',
      birth : '',
      address : '',
      phoneNum : '',
      email : '',
      education : '',
      shortPR : '',
      awards : [''],
      careers : [''],
      profileImage : ''
    };

    skillsData = {
      feSkills : [''],
      beSkills : [''],
      devOpsSkills : [''],
      certificates : ['']
    };

    projectsData = [
      {
        projectName : '',
        projectInfo : '',
        devPeriod : '',
        devMembers : '',
        devLang : '',
        skillFe : '',
        skillBe : '',
        skillDo : '',
        url : '',
        readme : '',
        experiences : [''],
        archImg : ''
      }
    ]
  } else {
    aboutMeData = portfolio.aboutMe;
    skillsData = portfolio.skills;
    projectsData = portfolio.projects;
  }
  let aboutMe = false;
  let skills = false;
  let projects = false;
  let toggle = false;

  let clickMenu;
  let scrollAbout;
  let scrollSkills;
  let scrollProjects;
  let myUrl = `http://localhost:5173/portfolio/${data.profile.id}`
  let navbar;
  let profileImage;
  let archImages = new Array(projectsData.length);
  let archImageNames = new Array(projectsData.length);


  function selectArchImg(event, index) {
    const file = event.target.files[0];
    if (file) {
      archImageNames[index] = file.name;
    }
  }

  function clickToggle() {
    toggle = !toggle;
  }

  function dupliCheck(arr) {
    const key = 'projectName';
    const uniqueValues = new Set(arr.map(item => item [key]));
    if(uniqueValues.size < arr.length) {
      return true;
    } else {
      return false;
    }
  }

  function checkTotalFileSize(formData) {
    const maxTotalSize = 40 * 1024 * 1024; // 50MB in bytes
    let totalSize = 0;

    // FormData의 각 엔트리(entry)에 대해 반복합니다.
    for (let entry of formData.entries()) {
        
      if (entry[1] instanceof File) {
        totalSize += entry[1].size;
      }
    }
    // 총 파일 크기가 50MB를 초과하는지 확인합니다.
    return totalSize > maxTotalSize;
  }

  async function submit() {
    if(dupliCheck(projectsData)) {
      alert('동일한 프로젝트명이 있습니다.');
      return;
    }

    let imageFiles = new FormData();

    imageFiles.append('id', data.profile.id);
    if(profileImage && profileImage.length > 0) {
      imageFiles.append('profile', profileImage[0]);
    }
    archImages.forEach((archImage, index) => {
      if(archImage && archImage.length > 0) {
        imageFiles.append(`project${index}`, archImage[0]);
      }
    });
    if(checkTotalFileSize(imageFiles)) {
      alert('사진의 총 용량은 50mb를 넘을 수 없습니다.');
      return;
    }
    let filesInfo = [];
    try {
      let res = await axios.post(`${PUBLIC_IMGHOSTING_URL}/dpUpload`, imageFiles);
      filesInfo = res.data.filesInfo;
    } catch (error) {
      console.log(error);
    }
    //성능 개선 필요
    // archImages.forEach((images, index) =>{
    //   filesInfo.forEach(files =>{
    //     if(files.filename.startsWith(`project${index}`)) {
    //       projectsData[index].archImage = files.filename;
    //     } else if (files.filename.startsWith('profile')) {
    //       aboutMeData.profileImage = files.filename;
    //     }
    //   });
    // });
    let classifiedFiles = {
      profile: null,
      projects: {}
    };

    filesInfo.forEach(file => {
      if (file.filename.startsWith('profile')) {
        classifiedFiles.profile = file.filename;
      } else {
        // 'project' 다음에 오는 숫자를 파싱합니다 (e.g., 'project1' => '1')
        let match = file.filename.match(/^project(\d+)/);
        if (match) {
          let projectIndex = match[1]; // 추출한 프로젝트 인덱스
          classifiedFiles.projects[`project${projectIndex}`] = file.filename;
        }
      }
    });

    archImages.forEach((images, index) => {
      if(classifiedFiles.projects[`project${index}`]) {
        projectsData[index].archImage = classifiedFiles.projects[`project${index}`];
      }
      
    });
    aboutMeData.profileImage = classifiedFiles.profile;

    let submitData = {
      id : data.profile.id,
      aboutMe : aboutMeData,
      skills : skillsData,
      projects : projectsData,
      email : data.profile.id
    }
    if(!portfolio) {
      axios.post('/submit', submitData)
      .then((res)=>{
        if(res.data.message === 'ok') {
          alert('성공적으로 저장 되었습니다.');
          throw redirect(300, '/mypage');
        } else {
          alert('저장에 실패했습니다.');
          throw redirect(300, '/mypage');
        }
        
      })
      .catch(err=>{
        console.log(err);
      });
    } else {
      axios.patch('/submit', submitData)
      .then((res)=>{
        if(res.data.message === 'ok') {
          alert('성공적으로 저장 되었습니다.');
          throw redirect(300, '/mypage');
        } else {
          alert('저장에 실패했습니다.');
          throw redirect(300, '/mypage');
        }
      })
      .catch(err=>{
        console.log(err);
      });
    }
  }

</script>

<nav class="navbar" bind:this={navbar} class:toggle={toggle}>
  <div class="navbar-container" >
    <button class="logo" on:click={()=>{
      goto('/');
    }}>
      <h1>Dev's Portfolio</h1>
    </button>
    <div style="flex-grow: 1;"></div>
    <div class="menu">
      <button class:menu-color={aboutMe} on:click={clickMenu(scrollAbout)}>About me</button>
      <button class:menu-color={skills} on:click={clickMenu(scrollSkills)}>Skills</button>
      <button class:menu-color={projects} on:click={clickMenu(scrollProjects)}>Projects</button>
      <button><a href={myUrl}>My URL</a></button>
      
    </div>
    <button on:click={clickToggle} class="menu-bar"><i class="fa-solid fa-bars fa-2x"></i></button>
  </div>
  <div class="m-menu">
    <button class:menu-color={aboutMe} on:click={clickMenu(scrollAbout)}>About me</button>
    <button class:menu-color={skills} on:click={clickMenu(scrollSkills)}>Skills</button>
    <button class:menu-color={projects} on:click={clickMenu(scrollProjects)}>Projects</button>
    <button><a href={myUrl}>My URL</a></button>
  </div>
</nav>

<div class="about-me" bind:this={scrollAbout}>
  <div class="about-me-title">
    <p>ABOUT ME</p>
  </div>
  <div class="main-line"></div>
  <div class="input-container">
    <div class="input-basic">
      <div class="basic-container">
        <input class="input-shape" type="text" placeholder="이름" bind:value={aboutMeData.name}>
        <input class="input-shape" type="text" placeholder="생년월일 (1996.12.29)" maxlength="10" bind:value={aboutMeData.birth}>
        <input class="input-shape" type="text" placeholder="주소지 (성남시 분당구)" bind:value={aboutMeData.address}>
        <input class="input-shape" type="text" placeholder="연락처 (010-1234-5678)" maxlength="13" bind:value={aboutMeData.phoneNum}>
        <input class="input-shape" type="text" placeholder="이메일" bind:value={aboutMeData.email}>
        <input class="input-shape" type="text" placeholder="학력 (OO대학교 컴퓨터공학과)" bind:value={aboutMeData.education}>
        <input type="text" class="input-shape" placeholder="한 줄 자기소개" bind:value={aboutMeData.shortPR} style="font-size: small;">
        <div class="profile-image">
          <label for="profile">프로필 이미지 (가로, 세로 동일 픽셀 권장)</label>
          <input type="file" id="profile-image" accept="image/*" name="profile" bind:files={profileImage}>
        </div>
        
      </div>
    </div>
    <div class="input-awards">
      <p style="font-size: larger; font-weight: bold;">AWARDS</p>
      {#each aboutMeData.awards as award, i (i)}
        <input class="input-shape" bind:value={award} type="text" placeholder="ex) OO주최 OO경진대회 우승">
      {/each}
      
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          if(aboutMeData.awards.length !== 1) {
            aboutMeData.awards.pop();
            aboutMeData.awards = [...aboutMeData.awards];
          }
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          if(aboutMeData.awards.length === 8) {
            alert('8개까지만 입력이 가능합니다.');
          } else {
            aboutMeData.awards = [...aboutMeData.awards, ''];
          }
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>
      </div>
    </div>  

    <div class="input-career">
      <p style="font-size: larger; font-weight: bold;">CAREER</p>
      {#each aboutMeData.careers as career, i (i)}
        <input class="input-shape" bind:value={aboutMeData.careers[i]} type="text" placeholder="ex) OO컴퍼니 백엔드 유지보수 (기간)">
      {/each}
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          if(aboutMeData.careers.length !== 1) {
            aboutMeData.careers.pop();
            aboutMeData.careers = [...aboutMeData.careers];
          }
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          if(aboutMeData.careers.length === 8) {
            alert('8개까지만 입력이 가능합니다.');
          } else {
            aboutMeData.careers = [...aboutMeData.careers, ''];
          }
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
      
    </div>
  </div>
</div>

<div class="skills" bind:this={scrollSkills}>
  <div class="skills-title">
    <p>SKILLS</p>
  </div>
  <div class="main-line"></div>
  <div class="skills-container">
    <div class="skills-input" id="skill1">
      <p style="font-size: larger; font-weight: bold;">FRONTEND</p>
      {#each skillsData.feSkills as feSkill, i (i)}
        <input class="input-shape" placeholder="ex) html, css, js" bind:value={skillsData.feSkills[i]} type="text">
      {/each}
      
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          if(skillsData.feSkills.length !== 1) {
            skillsData.feSkills.pop();
            skillsData.feSkills = [...skillsData.feSkills];
          }
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          if(skillsData.feSkills.length === 8) {
            alert('8개까지만 입력이 가능합니다.');
          } else {
            skillsData.feSkills = [...skillsData.feSkills, ''];
          }
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
    </div>
    <div class="skills-input" id="skill2">
      <p style="font-size: larger; font-weight: bold;">BACKEND</p>
      {#each skillsData.beSkills as beSkill, i (i)}
        <input class="input-shape" placeholder="ex) Spring, Nest" bind:value={skillsData.beSkills[i]} type="text">
      {/each}
      
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          if(skillsData.beSkills.length !== 1) {
            skillsData.beSkills.pop();
            skillsData.beSkills = [...skillsData.beSkills];
          }
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          if(skillsData.beSkills.length === 8) {
            alert('8개까지만 입력이 가능합니다.');
          } else {
            skillsData.beSkills = [...skillsData.beSkills, ''];
          }
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
    </div>
    <div class="skills-input" id="skill3">
      <p style="font-size: larger; font-weight: bold;">DEVOPS</p>
      {#each skillsData.devOpsSkills as devopsSkill, i (i)}
        <input class="input-shape" placeholder="ex) Nginx, Tomcat" bind:value={skillsData.devOpsSkills[i]} type="text">
      {/each}
      
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          if(skillsData.devOpsSkills.length !== 1) {
            skillsData.devOpsSkills.pop();
            skillsData.devOpsSkills = [...skillsData.devOpsSkills];
          }
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          if(skillsData.devOpsSkills.length === 8) {
            alert('8개까지만 입력이 가능합니다.');
          } else {
            skillsData.devOpsSkills = [...skillsData.devOpsSkills, ''];
          }
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
    </div>
    <div class="skills-input" style="border: none;" id="skill4">
      <p style="font-size: larger; font-weight: bold;">CERTIFICATES</p>
      {#each skillsData.certificates as certificate, i (i)}
        <input class="input-shape" placeholder="ex) 정보처리기사" bind:value={skillsData.certificates[i]} type="text">
      {/each}
      
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          if(skillsData.certificates.length !== 1) {
            skillsData.certificates.pop();
            skillsData.certificates = [...skillsData.certificates];
          }
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          if(skillsData.certificates.length === 8) {
            alert('8개까지만 입력이 가능합니다.');
          } else {
            skillsData.certificates = [...skillsData.certificates, ''];
          }
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
    </div>
  </div>
</div>
<div class="projects" bind:this={scrollProjects}>
  <div class="projects-title">
    <p>PROJECTS</p>
  </div>
  <div class="main-line" style="margin-bottom: -65px;"></div>
  {#each projectsData as project, i (i)}
  <div class="project-container">
    <div class="project-inputs" id="project1">
      <input type="text" class="input-shape" placeholder="프로젝트명" bind:value={project.projectName}>
      <input type="text" class="input-shape" placeholder="간단한 프로젝트 소개" bind:value={project.projectInfo}>
      <input type="text" class="input-shape" placeholder="개발 기간" bind:value={project.devPeriod}>
      <input type="text" class="input-shape" placeholder="개발 인원" bind:value={project.devMembers}>
      <input type="text" class="input-shape" placeholder="개발 언어" bind:value={project.devLang}>
      <input type="text" class="input-shape" placeholder="사용 기술 - Frontend" bind:value={project.skillFe}>
      <input type="text" class="input-shape" placeholder="사용 기술 - Backend" bind:value={project.skillBe}>
      <input type="text" class="input-shape" placeholder="사용 기술 - DevOps" bind:value={project.skillDo}>
      <input type="text" class="input-shape" placeholder="배포 링크" bind:value={project.url}>
      <input type="text" class="input-shape" placeholder="문서 링크 (README)" bind:value={project.readme}>
      <label for={`architecture${i}`}> 
        <div class="archLabel">
          <p>{archImageNames[i] || '아키텍처 이미지'}</p>
        </div>
      </label>
      <input bind:files={archImages[i]} class="input-shape" type="file" id={`architecture${i}`} name="architecture"
      accept="image/*" style="display: none;" on:change={e=> selectArchImg(e, i)}>
    </div>
    <div class="project-inputs" id="project2" style="position:relative; border:none;">
      {#each project.experiences as experience, i (i)}
      <textarea class="input-shape" placeholder="맡은 역할 및 문제 해결 경험" bind:value={experience} cols="30" rows="2"></textarea>
      {/each}
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          if(project.experiences.length !== 1) {
            project.experiences.pop();
            project.experiences = [...project.experiences];
          }
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          if(project.experiences.length === 9) {
            alert('9개까지만 입력이 가능합니다.');
          } else {
            project.experiences = [...project.experiences, ''];
          }
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>
      </div>
      <div class="project-delete">
        <button class="project-delete-button" on:click={()=>{
          if(projectsData.length !== 1) {
            projectsData.splice(i, 1);
            projectsData = projectsData;
            archImages.splice(i, 1);
            archImages = archImages;
            archImageNames.splice(i, 1);
            archImageNames = archImageNames;
          }
        }}>프로젝트 삭제</button>
      </div>
    </div>
  </div>
  {/each}
  <button class="circle-plus" on:click={()=>{
    if(projectsData.length === 8) {
      alert('프로젝트의 개수는 8개를 초과할 수 없습니다.')
    } else {
      projectsData = [...projectsData, {
        projectName : '',
        projectInfo : '',
        devPeriod : '',
        devMembers : '',
        devLang : '',
        skillFe : '',
        skillBe : '',
        skillDo : '',
        url : '',
        readme : '',
        experiences : ['']
      }];
      archImages = [...archImages, []];
      archImageNames = [...archImageNames, ''];
    }
    
  }}>
    <i class="fa-solid fa-plus fa-3x" style="color: #F4623A;"></i>
  </button>

  <div class="foot-btn">
    <div class="submit-form">
      <button class="submit-btn" on:click={submit}>
        저장하기
      </button>
    </div>

    <form class="logout" action="/logout" method="post">
      <button class="project-delete-button" on:click={()=>{
        alert('로그아웃 되었습니다.')
      }}>
        로그아웃
      </button>
    </form>
  </div>
  
</div>




<style>
  :global(body) {
    margin: 0;
  }

  div {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: darkgrey;
  }

  .navbar {
    position: fixed;
    background-color: white;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    width: 100%;
    color: black;
    height: 70px;
    overflow: hidden;
    transition: all 0.3s;
    z-index: 5;
  }

 

  .menu-color {
    color: #F4623A;
  }
  .navbar-container {
    display: flex;
    padding: 5px;
    height: 70px;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    margin-left: 40px;
    cursor: pointer;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    font-size: 16px;
    margin-left: 70px;
  }
  .menu {
    display: flex;
    width: 40%;
    padding-right: 100px;
    min-width: 465px;
  }

  
  .m-menu {
    background-color: white;
  }

  .menu button {
    cursor: pointer;
    width: 25%;
    font-size: 17px;
    text-align: center;
    font-weight: bold;
    border: none; 
    background-color: rgba(0, 0, 0, 0);
  }

  .menu button:hover {
    color: darkgrey;
  }

  .m-menu button {
    cursor: pointer;
    font-size: 17px;
    text-align: center;
    font-weight: bold;
    border: none; 
    background-color: rgba(0, 0, 0, 0);
    margin-left: 30px;
    display:block;
    margin-top: 20px;
  }

  .m-menu button:hover {
    color: darkgrey;
  }

  .menu-bar {
    display: none;
    width: 55px;
    height: 50px;
    border: 1px solid grey;
    border-radius: 5px;
    margin-right: 20px;
    color: grey;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
  }

  .toggle {
    height: 270px;
  }

  .about-me {
    height: 100vh;
    background-color: #eee;
    padding: 10px;
    text-align: center;
  }

  .about-me-title {
    padding: 10px;
    margin-top: 40px;
    font-weight: 900;
    font-size: 40px;
  }

  .main-line {
    margin: auto;
    margin-top: -50px;
    margin-bottom: 20px;
    width: 60px;
    height: 3px;
    background-color: #ff8563;
    border-radius: 50px;
  }

  .input-container {
    width: 90%;
    height: 74%;
    margin: auto;
    padding: 10px;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    display: flex;
    flex-wrap: wrap;
  }

  .input-basic {
    width: 33%;
    border-right: 1px solid #eee;
  }
  
  

  .input-shape {
    height: 20px;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid darkgrey;
    font-size: 20px;
    margin: 10px;
  }

  .basic-container {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }


  .basic-container input {
    width: 80%;
    font-size: 15px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  
  

  .profile-image {
    width: 86%;
    border: 1px solid darkgray;
    border-radius: 5px;
    padding: 10px;
    text-align: start;
    background-color: #eee;
  }

  .profile-image input {
    margin-top: 5px;
  }

  .profile-image label {
    font-size: 15px;
  }

  

  .input-awards {
    height: 100%;
    width: 33%;
    padding: 10px;
    border-right: 1px solid #eee;
  }

  .input-career {
    height: 100%;
    width: 33%;
    padding: 10px;
  }

  .input-shape {
    height: 20px;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid darkgrey;
    font-size: 20px;
    margin: 10px;
  }

  .input-awards input,.input-career input {
    width: 80%;
    font-size: 15px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }


  .plus-icon {
    border: none;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }

  .minus-icon {
    border: none;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }

  .skills {
    height: 100vh;
    background-color: rgb(89, 89, 89);
    padding: 10px;
    text-align: center;
  }

  .skills-title {
    padding: 10px;
    margin-top: 40px;
    font-weight: 900;
    font-size: 40px;
    color: white;
  }

  .skills-container {
    width: 90%;
    height: 74%;
    margin: auto;
    padding: 10px;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    display: flex;
    flex-wrap: wrap;
  }

  .skills-input {
    height: 100%;
    width: 25%;
    padding: 10px;
    border-right: 1px solid #eee;
  }

  .skills-input input{
    width: 80%;
    font-size: 15px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .projects {
    background-color: #eee;
    padding: 10px;
    text-align: center;
  }

  .projects-title {
    padding: 10px;
    margin-top: 40px;
    font-weight: 900;
    font-size: 40px;
    color: black;
  }

  .project-container {
    width: 90%;
    height: 600px;
    margin: auto;
    margin-top: 80px;
    padding: 10px;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    display: flex;
    flex-wrap: wrap;
  }

  .circle-plus {
    width: 55px;
    height: 55px;
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0);
    border: 3px solid #F4623A;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .project-inputs {
    width: 50%;
    padding: 10px;
    height: 100%;
    border-right: 1px solid #eee;
  }

  .project-inputs input {
    width: 80%;
    font-size: 15px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
 
  .project-inputs textarea {
    width: 80%;
    font-size: 13px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    resize: none;
  }

  .project-delete {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
  }

  .project-delete-button {
    border: none;
    padding: 10px;
    font-size: large;
    background-color:rgb(205, 0, 0);
    color: white;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }

  .archLabel {
    width: 80%;
    height: 30px;
    background-color: gray;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
    color: white;
    white-space: nowrap; /* 텍스트를 한 줄에 표시합니다. */
    overflow: hidden; /* 텍스트가 넘칠 경우 숨깁니다. */
    text-overflow: ellipsis; /* 넘치는 텍스트를 '...' 로 표시합니다. */
  }


  .submit-btn {
    border: none;
    padding: 10px;
    font-size: large;
    background-color:rgb(9, 134, 0);
    color: white;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }

  .foot-btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .logout {
    padding: 10px;
  }

  .submit-form {
    padding: 10px;
  }





 


 

  @media screen and (max-width: 981px) {
    .menu {
      padding-right: 20px;
      min-width: 390px;
    }
    .logo {
      margin-left: 30px;
      font-size: 15px;
    }

    .input-container {
      height: auto;
      margin-bottom: 30px;
    }


    .input-basic, .input-awards, .input-career {
      width: 100%;
      border-right: none;
      height: auto;
      padding-bottom: 20px;
    }

    .input-basic, .input-awards {
      border-bottom: 1px solid #eee;
    }

    .about-me {
      height: auto;
    }
    
    .skills {
      height: auto;
    }

    .skills-container {
      height: auto;
      margin-bottom: 80px;
    }
    .skills-input {
      width: 50%;
    }

    #skill2, #skill4 {
      border-right: none;
    }

    #skill1, #skill2 {
      padding-bottom: 50px;
    }

    


    .project-container {
      height: auto;
    }

    .project-inputs {
      width: 100%;
      height: 50%;
    }

    #project1 {
      border-right: none;
      border-bottom: 1px solid #eee;
    }

    .project-delete {
      position: relative;
      margin-top: 50px;
    }
    
  }

  

  

  @media screen and (max-width: 768px) {
    .menu button {
      display:none;
    }
    .m-menu {
      background-color: white;
    }
    .menu {
      min-width: 0;
    }
    .logo {
      margin-left: 20px;
      font-size: 14px;
    }
    .navbar {
      color: black;
      background-color: white;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    .menu-bar {
      display:flex;
    }
   

  }
</style>