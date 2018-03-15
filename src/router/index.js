import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
const home = resolve => require.ensure([],()=>resolve(require('@/pages/home/home')),'home');
const vote = resolve => require.ensure([],()=>resolve(require('@/pages/vote/vote')),'vote');
const winner = resolve => require.ensure([],()=>resolve(require('@/pages/winner/winner')),'winner');
const rule = resolve => require.ensure([],()=>resolve(require('@/components/rule')),'rule');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      children:[
        {
          path:'/home',
          component:home
        },
        {
          path:'/vote',
          component:vote
        },
        {
          path:'/rule',
          component:rule
        },
        {
          path:'/winner',
          component:winner
        }
      ]
    }
  ]
})
