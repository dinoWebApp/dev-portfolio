<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<script>
// @ts-nocheck

  import { onMount } from "svelte";
  onMount(()=>{
    let vh = window.innerHeight;
    const handleResize = ()=>{
      vh = window.innerHeight;
    }
    let handler = ()=>{
      if(window.scrollY === 0) {
        aboutMe = false;
        skills = false;
        proejects = false;
      } else if(window.scrollY > 0 && window.scrollY < vh - 80){
        aboutMe = true;
        skills = false;
        proejects = false;
      } else if(window.scrollY >= vh - 80 && window.scrollY < vh * 2 - 80) {
        aboutMe = false;
        skills = true;
        projects = false;
      } else {
        aboutMe = false;
        skills = false;
        projects = true;
      }
    }

    clickDetail = ()=>{
      window.scrollTo({
        top: scrollService.offsetTop,
        behavior : 'smooth'
      });
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

  let aboutMe = false;
  let skills = false;
  let projects = false;
  let toggle = false;

  let clickDetail;
  let clickMenu;
  let from_name;
  let email_id;
  let message;
  let scrollAbout;
  let scrollService;
  let scrollContact;
  let navbar;

  let awards = [''];
  let careers = [''];
  let feSkills = [''];
  let beSkills = [''];
  let devOpsSkills = [''];
  let certificates = [''];
  
  function clickToggle() {
    toggle = !toggle;
  }

  
</script>

<nav class="navbar" bind:this={navbar} class:toggle={toggle}>
  <div class="navbar-container" >
    <div class="logo">
      <h1>Dev's Portfolio</h1>
    </div>
    <div style="flex-grow: 1;"></div>
    <div class="menu">
      <p class:menu-color={aboutMe} on:click={clickMenu(scrollAbout)}>About me</p>
      <p class:menu-color={skills} on:click={clickMenu(scrollService)}>Skills</p>
      <p class:menu-color={projects} on:click={clickMenu(scrollContact)}>Projects</p>
      <p>Preview</p>
    </div>
    <div on:click={clickToggle} class="menu-bar"><i class="fa-solid fa-bars fa-2x"></i></div>
  </div>
  <div class="m-menu">
    <p class:menu-color={aboutMe} on:click={clickMenu(scrollAbout)}>About me</p>
    <p class:menu-color={skills} on:click={clickMenu(scrollService)}>Skills</p>
    <p class:menu-color={projects} on:click={clickMenu(scrollContact)}>Projects</p>
    <p>Preview</p>
  </div>
</nav>

<div class="about-me">
  <div class="about-me-title">
    <p>ABOUT ME</p>
  </div>
  <div class="main-line"></div>
  <div class="input-container">
    <div class="input-left">
      <div class="left-container">
        <input class="input-shape" type="text" placeholder="이름">
        <input class="input-shape" type="text" placeholder="생년월일 (961229)" maxlength="6">
        <input class="input-shape" type="text" placeholder="주소지 (성남시 분당구)">
        <input class="input-shape" type="text" placeholder="연락처 (01012345678)" maxlength="11">
        <input class="input-shape" type="text" placeholder="이메일">
        <input class="input-shape" type="text" placeholder="학력 (OO대학교 컴퓨터공학과)">
        <div class="profile-image">
          <label for="profile">프로필 이미지 (가로, 세로 동일 픽셀 권장)</label>
          <input type="file" id="profile" accept="image/*">
        </div>
        
      </div>
    </div>
    <div class="input-right">
      <div class="right-container">
        <input type="text" class="input-shape" placeholder="한 줄 자기소개">
        <textarea name="" id="" cols="30" rows="10" placeholder="간단한 자기소개"></textarea>
      </div>
    </div>
  </div>
  <div class="main-line" style="margin-top: 90px; margin-bottom: 90px"></div>
  <div class="input-container">
    <div class="input-awards">
      <p style="font-size: larger; font-weight: bold;">AWARDS</p>
      {#each awards as award, i (i)}
        <input class="input-shape" bind:value={awards[i]} type="text">
      {/each}
      
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          awards.pop();
          awards = [...awards];
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          awards = [...awards, ''];
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
      
    </div>  
    <div class="input-career">
      <p style="font-size: larger; font-weight: bold;">CAREER</p>
      {#each careers as career, i (i)}
        <input class="input-shape" bind:value={careers[i]} type="text">
      {/each}
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          careers.pop();
          careers = [...careers];
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          careers = [...careers, ''];
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
      
    </div>
  </div>
</div>

<div class="skills">
  <div class="skills-title">
    <p>SKILLS</p>
  </div>
  <div class="main-line"></div>
  <div class="skills-container">
    <div class="skills-input">
      <p style="font-size: larger; font-weight: bold;">FRONTEND</p>
      {#each feSkills as feSkill, i (i)}
        <input class="input-shape" placeholder="ex) html, css, js" bind:value={feSkills[i]} type="text">
      {/each}
      
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          feSkills.pop();
          feSkills = [...feSkills];
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          feSkills = [...feSkills, ''];
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
    </div>
    <div class="skills-input">
      <p style="font-size: larger; font-weight: bold;">BACKEND</p>
      {#each beSkills as beSkill, i (i)}
        <input class="input-shape" placeholder="ex) Spring, Nest" bind:value={beSkills[i]} type="text">
      {/each}
      
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          beSkills.pop();
          beSkills = [...beSkills];
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          beSkills = [...beSkills, ''];
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
    </div>
    <div class="skills-input">
      <p style="font-size: larger; font-weight: bold;">DEVOPS</p>
      {#each devOpsSkills as devopsSkill, i (i)}
        <input class="input-shape" placeholder="ex) Nginx, Tomcat" bind:value={devOpsSkills[i]} type="text">
      {/each}
      
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          devOpsSkills.pop();
          devOpsSkills = [...devOpsSkills];
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          devOpsSkills = [...devOpsSkills, ''];
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
    </div>
    <div class="skills-input" style="border: none;">
      <p style="font-size: larger; font-weight: bold;">CERTIFICATES</p>
      {#each certificates as certificate, i (i)}
        <input class="input-shape" placeholder="ex) 정보처리기사" bind:value={certificates[i]} type="text">
      {/each}
      
      <div class="plus-minus-icons">
        <button class="minus-icon" on:click={()=>{
          certificates.pop();
          certificates = [...certificates];
        }}>
          <i class="fa-regular fa-square-minus fa-3x" style="color: lightgrey;"></i>
        </button>
        <button class="plus-icon" on:click={()=>{
          certificates = [...certificates, ''];
        }}>
          <i class="fa-regular fa-square-plus fa-3x" style="color: lightgrey;"></i>
        </button>

      </div>
    </div>
  </div>
</div>



<style>
  :global(body) {
    margin: 0;
  }

  div {
    box-sizing: border-box;
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
  
  .m-menu p {
    cursor: pointer;
    font-size: larger;
    font-weight: bold;
    margin-left: 30px;
  }

  .menu p {
    cursor: pointer;
    width: 25%;
    font-size: larger;
    text-align: center;
    font-weight: bold;
  }

  .menu p:hover {
    color: darkgrey;
  }

  .m-menu p:hover {
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
  }

  .toggle {
    height: 270px;
  }

  .about-me {
    height: 200vh;
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
    width: 70%;
    height: 37%;
    margin: auto;
    padding: 10px;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    display: flex;
  }

  .input-left {
    width: 40%;
    border-right: 1px solid #eee;
  }
  
  .input-right {
    width: 60%;
  }

  .input-shape {
    height: 20px;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid darkgrey;
    font-size: 20px;
    margin: 10px;
  }

  .left-container {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .right-container {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .left-container input, textarea {
    width: 80%;
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

  .right-container input {
    width: 80%;
  }

  .right-container textarea {
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid darkgrey;
    font-size: 20px;
    height: 80%;
  }

  .input-awards {
    height: 100%;
    width: 50%;
    padding: 10px;
    border-right: 1px solid #eee;
  }

  .input-career {
    height: 100%;
    width: 50%;
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
    width: 80%;
    height: 74%;
    margin: auto;
    padding: 10px;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    display: flex;
  }

  .skills-input {
    height: 100%;
    width: 25%;
    padding: 10px;
    border-right: 1px solid #eee;
  }






 


 

  @media screen and (max-width: 981px) {
    .menu {
      padding-right: 20px;
      min-width: 370px;
    }
    
  }

  

  

  @media screen and (max-width: 768px) {
    .menu p {
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