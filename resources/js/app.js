require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import VueRouter from 'vue-router'
import { Form, HasError, AlertError } from 'vform';
import Swal from 'sweetalert2'
import VueProgressBar from 'vue-progressbar'
import moment from 'moment';

Vue.use(VueRouter)
window.Form = Form;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import dashboard from './components/Dashboard.vue'
import profile from './components/Profile.vue'
import employees from './components/Employee.vue'

window.Swal = Swal;
// CommonJS
//const Swal = require('sweetalert2')
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  window.Toast = Toast;

  
  const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'left',
    inverse: false
  }
  
  Vue.use(VueProgressBar, options)

Vue.filter('dateFormat',function(created){
    return moment(created).format('MMMM Do YYYY');
});


window.Fire =  new Vue();
let routes = [
    { path: '/dashboard', component: dashboard },
    { path: '/profile', component: profile },
    { path: '/employees', component: employees }
  ]

  const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  })

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: '#app',
    router
});
