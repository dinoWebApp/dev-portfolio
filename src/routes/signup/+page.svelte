<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>


<div class="container">
  <div class="auth-form">
    <form class="form-container" method="post" action="?/GoogleOAuth" style="margin-top: 35vh;">
      <button class="signUp-btn">
        <div>
          <i class="fa-brands fa-google fa-2x"></i>Google로 로그인하기
        </div>
      </button>
    </form>
    <form class="form-container" method="post" action="?/GitHubOAuth">
      <button class="signUp-btn">
        <div>
          <i class="fa-brands fa-square-github fa-2x"></i>GitHub로 로그인하기
        </div>
      </button>
    </form>
  </div>
</div>


<style>

  div {
    box-sizing: border-box;
  }
  .container {
    background-color: #eee;
    width: 100vw;
    height: 100vh;
  }

  .auth-form {
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  .signUp-btn {
    display: block;
    padding: 10px;
    background-color: white;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    font-size: large;
    width: 280px;
    height: 60px;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
  }

  .signUp-btn:hover {
    background-color: #efeeee;
  }

  .signUp-btn div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fa-google {
    color: rgb(0, 102, 255);
  }

  .fa-brands {
    margin-right: 15px;
  }

  .form-container {
    padding: 10px;
  }
</style>