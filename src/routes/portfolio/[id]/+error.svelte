<script>
  import { goto } from "$app/navigation";
</script>

<nav class="navbar">
  <div class="navbar-container" >
    <button class="logo" on:click={()=>{
      goto('/');
    }}>
      <h1>Dev's Portfolio</h1>
    </button>
    <div class="menu">  
      <button><a href='/'>Home</a></button>
    </div>
  </div>
</nav>
<div class="error-message">
  <h1>저장된 포트폴리오가 존재하지 않습니다.</h1>
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
    width: 30%;
  }
  .menu {
    display: flex;
    justify-content: end;
    width: 70%;
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

  .error-message { 
    display: flex;
    padding: 10px;
    height: 796px;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 981px) {
    .menu {
      padding-right: 20px;
    }
    .logo {
      margin-left: 30px;
      font-size: 15px
    }
    
  }

  

  

  @media screen and (max-width: 768px) {
    .menu {
      width: 50%;
    }
    .logo {
      font-size: 12px;
      margin-left: 10px;
      width: 50%;
    }

    .error-message {
      font-size: 10px;
    }

  }




</style>