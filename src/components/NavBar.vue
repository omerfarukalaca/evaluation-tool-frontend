<template>
  <div class="navbar">
    <nav class="indigo darken-2">
      <div class="container">
        <div class="nav-wrapper">
          <div class="nav-content">
            <router-link to="/">
              <span>Agent DSML Evaluation Tool</span>
            </router-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <router-link to="/languages">
                    <span>Languages</span>
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


