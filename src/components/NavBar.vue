<template>
  <div class="navbar">
    <nav class="indigo darken-2">
      <div class="container">
        <div class="nav-wrapper">
          <div class="nav-content">
            <router-link to="/">
              <span>AgentDSM-Eval Tool</span>
            </router-link>
            <ul id="nav-mobile" class="right">
              <li>
                <router-link to="/add-language">
                    <span>Add New MAS DSML</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
</style>


