<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<script>
// @ts-nocheck

  import { onMount } from "svelte";
  import { init, send } from 'emailjs-com'
  init('FbgTsZ9mReHm6CCfe');
  onMount(()=>{
    let vh = window.innerHeight;
    const handleResize = ()=>{
      vh = window.innerHeight;
    }
    let handler = ()=>{
      if(window.scrollY === 0) {
        navbarTrans = false;
        about = false;
        services = false;
        contact = false;
      } else if(window.scrollY > 0 && window.scrollY < vh - 80){
        navbarTrans = true;
        about = true;
        services = false;
        contact = false;
      } else if(window.scrollY >= vh - 80 && window.scrollY < vh * 2 - 80) {
        navbarTrans = true;
        about = false;
        services = true;
        contact = false;
      } else {
        navbarTrans = true;
        about = false;
        services = false;
        contact = true;
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

  let navbarTrans = false;
  let about = false;
  let services = false;
  let contact = false;
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
  
  function clickToggle() {
    toggle = !toggle;
  }

  function sendMail() {
    if(
      from_name.value === ''||
      email_id.value === ''||
      message.value === ''
    ) alert('입력되지 않은 부분이 있습니다.');
    else {
      let params = {
        from_name : from_name.value,
        email_id : email_id.value,
        message : message.value
      };
      send(
        'service_agwu1jf',
        'template_f5a90ty',
        params
      ).then(res=>{
        from_name.value = '';
        email_id.value = '';
        message.value = '';
        alert('전송 완료');
      })
      .catch(err=>{
        console.log(err);
      })
    } 
  }
</script>

<nav class="navbar" bind:this={navbar} class:navbar-trans={navbarTrans} class:toggle={toggle}>
  <div class="navbar-container" >
    <div class="logo">
      <h1>Dev's Portfolio</h1>
    </div>
    <div style="flex-grow: 1;"></div>
    <div class="menu">
      <p class:menu-color={about} on:click={clickMenu(scrollAbout)}>About</p>
      <p class:menu-color={services} on:click={clickMenu(scrollService)}>Services</p>
      <p class:menu-color={contact} on:click={clickMenu(scrollContact)}>Contact</p>
      <p>MyPage</p>
    </div>
    <div on:click={clickToggle} class="menu-bar"><i class="fa-solid fa-bars fa-2x"></i></div>
  </div>
  <div class="m-menu">
    <p class:menu-color={about} on:click={clickMenu(scrollAbout)}>About</p>
    <p class:menu-color={services} on:click={clickMenu(scrollService)}>Services</p>
    <p class:menu-color={contact} on:click={clickMenu(scrollContact)}>Contact</p>
    <p>MyPage</p>
  </div>
</nav>

<div class="main-banner" bind:this={scrollAbout}>
  <div class="banner-container">
    <div class="main-text">
      <div class="title">
        <p>개발자들을 위한</p>
        <p>맞춤 포트폴리오 제작 사이트</p>
      </div>
      <div class="main-line"></div>
      <div class="main-detail">
        <p>막막하기만 하던 개발자 포트폴리오</p>
        <p>쉽고 빠르게 제작해보세요</p>
      </div>
    </div>
    <div class="main-btn">
      <button class="btn-detail" on:click={clickDetail}>더 알아보기<i class="fa-solid fa-arrow-down" style="margin-left: 5px;"></i></button>
    </div>
  </div>
</div>

<div class="services" bind:this={scrollService}>
  <div class="service-container">
    <div class="service-title">
      <p>SERVICES</p>
    </div>
    <div class="service-line"></div>
    <div class="service-category-container">
      <div class="service-category">
        <div class="category">
          <div class="category-left">
            <div class="category-icon">
              <i class="fa-regular fa-id-card fa-5x"></i>
            </div>
            <div class="category-title">
              <p>PROFILE</p>
            </div>
          </div>
          <div class="category-text">
            <div class="category-detail">
              <p>프로필 사진, 기본적인 개인정보와 자기소개, 수상이력, 자격증, 경력 등을 기입하실 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="service-category">
        <div class="category">
          <div class="category-left">
            <div class="category-icon">
              <i class="fa-solid fa-gears fa-5x"></i>
            </div>
            <div class="category-title">
              <p>SKILLS</p>
            </div>
          </div>
          <div class="category-text">
            <div class="category-detail">
              <p>보유하신 분야별 관련 기술들을 기입하실 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="service-category">
        <div class="category">
          <div class="category-left">
            <div class="category-icon">
              <i class="fa-solid fa-file-lines fa-5x"></i>
            </div>
            <div class="category-title">
              <p>PROJECTS</p>
            </div>
          </div>
          <div class="category-text">
            <div class="category-detail">
              <p>참여한 프로젝트에 관한 내용들을 기입하실 수 있습니다. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="service-btn">
      <button class="btn-detail">시작하기</button>
    </div>
  </div>
</div>
<div class="contact-container" bind:this={scrollContact}>
  <div class="contact-title">
    <p>CONTACT US</p>
  </div>
  <div class="contact-line"></div>
  <div class="contact-info">
    <p>문의사항은 아래의 폼에 작성하여 남겨주세요</p>
  </div>
  <div class="contact-form">
    <div>
      <input type="text" bind:this={from_name} id="name" placeholder="이름" required>
      <input type="email" bind:this={email_id} id="email" placeholder="연락 받을 이메일" required>
      <textarea bind:this={message} name="" id="message" cols="30" rows="8" placeholder="문의 내용"></textarea>
      <button class="submit-btn" on:click={sendMail}>전송</button>
    </div>
  </div>
</div>

<footer>
  <p>©2023. DEV-PORTFOLIO,ALL RIGHTS RESERVED</p>
</footer>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    box-sizing: border-box;
  }

  .navbar {
    position: fixed;
    width: 100%;
    color: white;
    height: 70px;
    overflow: hidden;
    transition: all 0.3s;
  }

  .navbar-trans {
    color: black;
    background-color: white;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
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


  .main-banner {
    width: 100%;
    height: 100vh;
    background-image: url('/image/banner.jpg');
    background-size: cover;
    background-position: center center;
  }

  .banner-container {
    padding-top: 100px;
    width: 100%;
    height: 100%;
    background-color: rgba(36, 15, 15, 0.6);
  }
  .main-text {
    margin-top: 140px;
  }

  .title {
    width: 100%;
    text-align: center;
    color: white;
    font-size: 50px;
    font-weight: 900;
  }

  .title p {
    line-height: 0.5;
  }

  .main-line {
    margin: auto;
    margin-top: -20px;
    width: 70px;
    height: 3px;
    background-color: rgb(255, 200, 0);
    border-radius: 50px;
  }

  .main-detail {
    color: white;
    text-align: center;
    font-size: x-large;
  }

  .main-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 80px;
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
    background-color: #d05533;
  }
  

  .service-container {
    padding: 10px;
    height: 100vh;
    background-color: white;
  }

  .service-title {
    text-align: center;
    font-weight: 900;
    padding: 10px;
    margin-top: 70px;
    font-size: 50px;
  }

  .service-category-container {
    padding: 10px;
    display: flex;
    justify-content: center;
  }

  .service-category {
    width: 33%;
    text-align: center;
  }

  .category-title p {
    font-size: x-large;
    font-weight: bold;
  }

  .category-detail p{
    width: 70%;
    margin: auto;
    line-height: 2;
    font-size: large;
  }

  .category-icon {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    height: 150px;
    width: 150px;
    background-color: #ffc800;
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .service-line {
    background-color: #ff8563;
    width: 70px;
    height: 3px;
    border-radius: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -50px;
  }

  .service-btn {
    display: flex;
    margin-top: 40px;
  }

  .contact-container {
    height: 100vh;
    background-color: #eee;
    padding: 10px;
    text-align: center;
  }

  .contact-title {
    font-weight: 900;
    padding: 10px;
    margin-top: 70px;
    font-size: 50px;
  }

  .contact-line {
    margin: auto;
    margin-top: -55px;
    width: 70px;
    height: 3px;
    background-color: rgb(255, 200, 0);
    border-radius: 50px;
  }

  .contact-info {
    color: darkgray;
  }

  input, textarea {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  input {
    width: 40%;
    padding: 10px;
    font-size: 20px;
    border-radius: 5px;
    border: 1px solid darkgray;
    margin-bottom: 10px;
  }

  textarea {
    width: 40%;
    padding: 10px;
    border: 1px solid darkgray;
    border-radius: 5px;
    font-size: 20px;
  }

  .submit-btn{
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    width: 180px;
    height: 60px;
    font-size: larger;
    background-color: #222222;
    color: white;
    border: 0px;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }

  .submit-btn:hover {
    background-color: #838383;
  }

  footer {
    text-align: center;
    padding: 30px 0px;
    background-color: #222222;
    color: white;
  }

  

  @media screen and (max-width: 981px) {
    .menu {
      padding-right: 20px;
      min-width: 370px;
    }
    .category-detail p {
      font-size: medium;
      width:90%;
    }
    input, textarea {
      width: 60%;
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
    .title p {
      font-size: 30px;
      line-height: 1;
    }
    .main-line {
      margin-top: 0px;
      width: 50px;
    }

    .main-detail {
      font-size: 18px;
      margin-top: 30px;
    }
    .service-title {
      font-size: 35px;
    }

    .service-line {
      margin-top: -40px;
      width: 50px;
    }

    .service-category-container {
      flex-wrap: wrap;
    }

    .category {
      display: flex;
    }

    .category-left {
      width: 33%;
    }

    .category-text {
      width: 66%;
      margin-top: 35px;
    }

    .category-text p {
      text-align: left;
      font-size: 15px;
    }


    .service-category {
      width: 100%;
    }

    .category-icon {
      height: 100px;
      width: 100px;
      font-size: 12px;
    }

    .category-title p{
      font-size: medium;
    }

    .service-btn {
      margin-top: -5px;
    }

    .service-btn button {
      width: 150px;
    }

    .contact-title {
      font-size: 35px;
    }

    .contact-line {
      margin-top: -40px;
      width: 50px;
    }

    input, textarea {
      width: 60%;
    }

  }
</style>