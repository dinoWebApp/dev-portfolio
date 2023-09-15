<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { PUBLIC_IMGHOSTING_URL } from "$env/static/public";

  import { onMount } from "svelte";

  
  
  onMount(()=>{

    // 스킬 종류에 따른 화면 분배
    skillsHeight = `${100/skillsContainer.childElementCount}%`;
    
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

    // 클릭한 카테고리로 스크롤 이동
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

  const myData = data.publicDP;

  let aboutMe = false;
  let skills = false;
  let projects = false;
  let toggle = false;
  let profileUrl = `${PUBLIC_IMGHOSTING_URL}/image?filename=${myData.aboutme.profileImage}`
  let archUrl = `${PUBLIC_IMGHOSTING_URL}/image?filename=${myData.aboutme.archImg}`
  let clickMenu;
  let scrollAbout;
  let scrollSkills;
  let scrollProjects;
  let navbar;

  // 모바일 메뉴 클릭
  function clickToggle() {
    toggle = !toggle;
  }

  let skillsContainer;
  let skillsHeight = '0%';



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
      <button><a href='/'>Home</a></button>
    </div>
    <button on:click={clickToggle} class="menu-bar"><i class="fa-solid fa-bars fa-2x"></i></button>
  </div>
  <!-- 모바일 메뉴 -->
  <div class="m-menu">
    <button class:menu-color={aboutMe} on:click={clickMenu(scrollAbout)}>About me</button>
    <button class:menu-color={skills} on:click={clickMenu(scrollSkills)}>Skills</button>
    <button class:menu-color={projects} on:click={clickMenu(scrollProjects)}>Projects</button>
    <button><a href='/'>Home</a></button>
  </div>
</nav>

<!-- 자기 소개 -->
<div class="aboutme-1">
  <div style="height: 10px;"></div>
  <div class="profile-container">
    {#if myData.aboutme.profileImage}
      <img src={profileUrl} alt="profile">
    {:else}
      <img src="/image/profile.png" alt="profile">
    {/if}
  </div>
  <div class="aboutMe-pr">
    <h1>{myData.aboutme.name}</h1>
    <div class="short-pr"> 
      <p>{myData.aboutme.shortPR}</p>
    </div>
  </div>
  <div class="main-btn">
    <button class="btn-detail" on:click={clickMenu(scrollAbout)}>더 알아보기<i class="fa-solid fa-arrow-down" style="margin-left: 5px;"></i></button>
  </div>
</div>


<!-- 개인 정보 -->
<div class="aboutme-2" bind:this={scrollAbout}>
  <div class="title">
    <h1>ABOUT ME</h1>
  </div>
  <div class="main-line"></div>
  <div class="aboutme-info-container">
    <div class="aboutme-info">
      <div class="aboutme-icon">
        <i class="fa-solid fa-user fa-3x"></i>
      </div>
      <div class="aboutme-text">
        <div class="aboutme-text-title">
          <h2>성명</h2>
        </div>
        <div class="aboutme-text-content">
          <p>{myData.aboutme.name}</p>
        </div>
      </div>
    </div>
    <div class="aboutme-info">
      <div class="aboutme-icon">
        <i class="fa-solid fa-calendar fa-3x"></i>
      </div>
      <div class="aboutme-text">
        <div class="aboutme-text-title">
          <h2>생년월일</h2>
        </div>
        <div class="aboutme-text-content">
          <p>{myData.aboutme.birth}</p>
        </div>
      </div>
    </div>
    <div class="aboutme-info">
      <div class="aboutme-icon">
        <i class="fa-solid fa-location-dot fa-3x"></i>
      </div>
      <div class="aboutme-text">
        <div class="aboutme-text-title">
          <h2>거주지</h2>
        </div>
        <div class="aboutme-text-content">
          <p>{myData.aboutme.address}</p>
        </div>
      </div>
    </div>
    <div class="aboutme-info">
      <div class="aboutme-icon">
        <i class="fa-solid fa-phone fa-3x"></i>
      </div>
      <div class="aboutme-text">
        <div class="aboutme-text-title">
          <h2>연락처</h2>
        </div>
        <div class="aboutme-text-content">
          <p>{myData.aboutme.phoneNum}</p>
        </div>
      </div>
    </div>
    <div class="aboutme-info">
      <div class="aboutme-icon">
        <i class="fa-solid fa-envelope fa-3x"></i>
      </div>
      <div class="aboutme-text">
        <div class="aboutme-text-title">
          <h2>이메일</h2>
        </div>
        <div class="aboutme-text-content">
          <p>{myData.aboutme.email}</p>
        </div>
      </div>
    </div>
    <div class="aboutme-info">
      <div class="aboutme-icon">
        <i class="fa-solid fa-graduation-cap fa-3x"></i>
      </div>
      <div class="aboutme-text">
        <div class="aboutme-text-title">
          <h2>학력</h2>
        </div>
        <div class="aboutme-text-content">
          <p>{myData.aboutme.education}</p>
        </div>
      </div>
    </div>

    <!-- 경력 사항, 수상 경력 유무에 따른 ui 변화 -->
    {#if myData.aboutme.awards.length !== 1 || myData.aboutme.awards[0] !== ""
    || myData.aboutme.careers.length !== 1 || myData.aboutme.careers[0] !== ""}
      <div style="width: 100%; margin-top: 40px; margin-bottom: 40px">
        <div class="main-line"></div>
      </div>
    {/if}

    {#if myData.aboutme.awards.length !== 1 || myData.aboutme.awards[0] !== ""}
      <div class="aboutme-info-etc">
        <div class="etc-title">
          <i class="fa-solid fa-trophy fa-3x"></i>
          <h1 style="margin-left: 20px;">수상 내역</h1>
        </div>
        {#each myData.aboutme.awards as award}
          <div class="etc-contents">
            <i class="fa-solid fa-award"></i>
            <p>{award}</p>
          </div>
        {/each}
      </div>
    {/if}

    {#if myData.aboutme.careers.length !== 1 || myData.aboutme.careers[0] !== ""}
      <div class="aboutme-info-etc">
        <div class="etc-title">
          <i class="fa-regular fa-pen-to-square fa-3x"></i>
          <h1 style="margin-left: 20px;">경력 사항</h1>
        </div>
        {#each myData.aboutme.careers as career}
          <div class="etc-contents">
            <i class="fa-solid fa-paperclip"></i>
            <p>{career}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>


<!-- 보유 기술 -->
<div class="skills" bind:this={scrollSkills}>
  <div class="title">
    <h1>SKILLS</h1>
  </div>
  <div class="main-line"></div>

  <div class="skills-container" bind:this={skillsContainer}>
    {#if myData.skills.feSkills.length !== 1 || myData.skills.feSkills[0] !== ""}
      <div class="skills-detail" style={`
        height : ${skillsHeight};
      `}>
        <div class="skill-title">
          <h1>Frontend</h1>
        </div>
        <div class="skill-stack">
          {#each myData.skills.feSkills as skill}
            <div class="skill-contents">
              {skill}
            </div>
          {/each}
        </div>
      </div>
    {/if}
    {#if myData.skills.beSkills.length !== 1 || myData.skills.beSkills[0] !== ""}
      <div class="skills-detail" style={`
        height : ${skillsHeight};
      `}>
        <div class="skill-title">
          <h1>Backend</h1>
        </div>
        <div class="skill-stack">
          {#each myData.skills.beSkills as skill}
            <div class="skill-contents">
              {skill}
            </div>
          {/each}
        </div>
      </div>
    {/if}
    {#if myData.skills.devOpsSkills.length !== 1 || myData.skills.devOpsSkills[0] !== ""}
      <div class="skills-detail" style={`
        height : ${skillsHeight};
      `}>
        <div class="skill-title">
          <h1>DevOps</h1>
        </div>
        <div class="skill-stack">
          {#each myData.skills.devOpsSkills as skill}
            <div class="skill-contents">
              {skill}
            </div>
          {/each}
        </div>
      </div>
    {/if}
    {#if myData.skills.certificates.length !== 1 || myData.skills.certificates[0] !== ""}
      <div class="skills-detail" style={`
        height : ${skillsHeight};
      `}>
        <div class="skill-title">
          <h1>Certificates</h1>
        </div>
        <div class="skill-stack">
          {#each myData.skills.certificates as skill}
            <div class="skill-contents">
              {skill}
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  
</div>


<!-- 프로젝트 목록 -->
<div class="projects" bind:this={scrollProjects}>
  <div class="title">
    <h1>PROJECTS</h1>
  </div>
  <div class="main-line"></div>
  {#each myData.projects as project}
    <div class="project-container">
      <div class="project-detail">
        <h2 style="text-align: center;">{project.projectName}</h2>
        <div class="project-detail-text">
          <p>프로젝트 소개 : {project.projectInfo}</p>
          <p>개발 기간 : {project.devPeriod}</p>
          <p>개발 인원 : {project.devMembers}</p>
          <p>개발 언어 : {project.devLang}</p>
          <p>Frontend : {project.skillFe}</p>
          <p>Backend : {project.skillBe}</p>
          <p>DevOps : {project.skillDo}</p>
          <p>배포 링크 : <a href={project.url} target="_blank">{project.url}</a></p>
          <p>README : <a href={project.readme} target="_blank">{project.readme}</a></p>
        </div>
      </div>

      <!-- 프로젝트 아키텍처 이미지 -->
      <div class="project-info">
        <div class="arch-img">
          {#if myData.projects.archImg}
            <img src={archUrl} alt="">
          {:else}
            <img src="/image/arch-img.jpeg" alt="">
          {/if}
        </div>
      </div>
      <div class="main-line" style="margin-top: 50px; margin-bottom: 50px"></div>
      <div class="project-experiences">
        {#each project.experiences as experience}
          <div class="experience">
            <i class="fa-solid fa-gear"></i>
            <p>{experience}</p>
          </div>
        {/each}
      </div>
    </div>
  {/each}
  
</div>


<style>
  :global(body) {
    margin: 0;
    font-family: 'Noto Sans KR','Apple SD Gothic Neo',Sans-serif;
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
    color: #F4623A !important;
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
    margin-left: 70px;
    font-size: 16px;
    color: inherit;
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
    color: black;
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

  .aboutme-1 {
    height: 100vh;
  }

  .profile-container {
    margin-top: 130px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    border: 5px solid #eee;
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
  }

  .profile-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .aboutMe-pr h1{
    text-align: center;
    font-size: 40px;
    font-weight:900;
  }

  .short-pr {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }

  .short-pr p{
    text-align: center;
    font-size: larger;
    font-weight: bold;
    padding: 10px;
  }

  .main-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 70px;
  }

  .btn-detail {
    margin-left: auto;
    margin-right: auto;
    width: 170px;
    height: 60px;
    font-size: large;
    background-color: #F4623A;
    color: white;
    border: 0px;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-detail:hover {
    background-color: #d35532;
  }

  .aboutme-2 {
    height: auto;
    min-height: 796px;
    background-color: #eee;
    padding-bottom: 60px;
  }

  .title {
    padding: 10px;
  }
  .title h1 {
    margin-top: 100px;
    margin-bottom: 0px;
    text-align: center;
    font-weight: 900;
    font-size: 40px;
  }

  .main-line {
    margin: auto;
    width: 60px;
    height: 3px;
    background-color: #ff8563;
    border-radius: 50px;
  }

  .aboutme-info-container {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    width: 80%;
    height: auto;
    min-height: 500px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }

  .aboutme-info {
    width: 33%;
    height: 200px;
    display: flex;
  }

  .aboutme-icon {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .aboutme-text {
    width: 60%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .aboutme-text-title {
    width: 100%;
    height: 50%;
    display: flex;
    align-items:end;
  }
  .aboutme-text-title h2 {
    margin: 0px;
    font-size: 30px
  }
  

  .aboutme-text-content {
    width: 100%;
    height: 50%;
    font-size: 20px;
    word-wrap: break-word;
  }


  .aboutme-info-etc {
    width: 50%;
    padding-left: 40px;
    margin-right: -40px;
    margin-bottom: 30px;
  }

  .etc-title {
    display: flex;
    align-items: center;
    margin-top: 40px;
  }

  .etc-contents {
    display: flex;
    margin-bottom: 20px;
    margin-left: 60px;
    margin-top: 10px;
  }

  .etc-contents p {
    margin: 0px;
    margin-left: 10px;
    font-size: large;
    line-height: 1.5;
  }

  .etc-contents i {
    line-height: 1.5;
  }

  .skills {
    height: 796px;
  }

  .skills-container {
    margin-top: 20px;
    height: 590px;
  }

  .skills-detail {
    width: 90%;
    margin: auto;
    /* margin-bottom: 10px; */
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .skill-title {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .skill-stack {
    padding: 20px;
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: lightgray solid 3px;
  }

  .skill-contents {
    width: 25%;
    font-size: larger;
    padding: 10px;
  }

  .projects {
    background-color: #eee;
    padding: 10px;
  }

  .project-container {
    margin-top: 30px;
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    height: auto;
    padding: 10px;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    display: flex;
    flex-wrap: wrap;
  }




  .project-info {
    width: 50%;
    padding: 10px;
  }

  .project-detail {
    width: 50%;
    
  }

  .arch-img {
    width: 100%;
    max-height: 500px;
    overflow: hidden;
    border-radius: 25px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }

  .arch-img img {
    width: 100%;
    height: auto;
  }

  .project-detail-text {
    padding-left: 20px;
    padding-top: 10px;
    font-size: larger;
  }

  .project-detail-text a {
    color: #258ddb;
  }

  .project-detail-text a:hover {
    text-decoration: underline;
  }

  .project-experiences {
    padding: 20px;
    width: 100%;
  }

  .experience {
    display: flex;
    margin-bottom: 20px;
  }

  .experience p {
    margin: 0px;
    margin-left: 10px;
    font-size: large;
    line-height: 1.5;
  }

  .experience i {
    line-height: 1.5;
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

    .aboutme-info {
      width: 50%;
    }

    .aboutme-info-etc {
      margin-right: 0px;
      padding-left: 0px;
      justify-content: center;
    }

    .aboutme-text h2{
      font-size: 27px;
    }

    .aboutme-text p {
      font-size: 20px;
    }

    .aboutme-icon i {
      font-size: 35px;
    }

    .etc-title {
      padding-bottom: 10px;
    }
  

    .etc-title i {
      font-size: 35px;
      width: 40%;
      text-align: center;
    }

    .etc-title h1 {
      font-size: 25px;
      width: 60%;
      margin-left: 0px !important;
    }

    .etc-contents p {
      font-size: 16px;
    }

    .etc-contents {
      justify-content: center;
      margin-left: 0px;
    }

    .skill-title h1{
      font-size: 25px;
    }


    .skill-contents {
      font-size: 17px;
    }

    .project-detail {
      width: 100%;
    }

    .project-info {
      width: 100%;
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
      margin-left: 15px;
      font-size: 12px;
    }
    .navbar {
      color: black;
      background-color: white;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    .menu-bar {
      display:flex;
    }

    .title h1{
      font-size: xx-large;
    }

    .profile-container {
      width: 250px;
      height: 250px;
    }

    .aboutMe-pr h1 {
      font-size: 30px;
      margin-top: 40px;
      margin-bottom: 30px;
    }

    .short-pr p {
      font-size: 17px;
      line-height: 1.5;
    }

    .aboutme-info {
      width: 100%;
      height: 120px;
    }

    .aboutme-info-container {
      width: 90%;
      justify-content: center;
    }

    .aboutme-text h2{
      font-size: 25px;
    }

    .aboutme-text p {
      font-size: 16px;
    }

    .aboutme-icon i {
      font-size: 35px;
    }

    .etc-title {
      justify-content: center;
      padding-bottom: 10px;
    }

    .etc-contents {
      justify-content: center;
    }

    .etc-title i {
      font-size: 35px;
      width: 40%;
      text-align: center;
    }

    .etc-title h1 {
      font-size: 25px;
      width: 60%;
      margin-left: 0px !important;
    }

    .etc-contents p {
      font-size: 16px;
    }

    .aboutme-info-etc {
      padding-left: 0px;
      width: 100%;
      justify-content: center;
    }

    .etc-contents {
      margin-left: 0px;
    }

    .skills {
      height: 1592px;
    }

    .skills-container {
      height: 1300px;
    }

    .skill-title {
      width: 100%;
    }

    .skill-stack {
      width: 100%;
    }

    .skill-title h1{
      font-size: 30px;
    }


    .skill-contents {
      width: 50%;
      font-size: 17px;
      text-align: center;
    }

    .project-detail-text {
      font-size: 16px;
      line-height: 2;
    }

    .experience p {
      font-size: 15px;
    }

  }
</style>