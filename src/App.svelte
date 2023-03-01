<script>
  import { append_hydration } from "svelte/internal";

  let msg = "Hello world from electron app";
  let counter = 0;
  let info = {}
  api.onCount((data) => {
    counter = data;
  });

  api.onDataChange((data) => {
    console.log(data)
    info = data
  })

  const sendMessage = async () => {
    api.sendMessage(msg);
    msg = "";
  };

  const changeData = async (e) => {
    console.log(e.target.value)
    api.changeData(e.target.value);
  };
</script>

<main>
  <h1>electron app</h1>
  <select name="" id="" on:input={changeData}>
    <option value="versions">Versions</option>
    <option value="user">User</option>
    <option value="osInfo">osInfo</option>
  </select>
  <pre>
    {JSON.stringify(info, null, 4)}
  </pre>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
