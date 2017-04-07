import HomeConfig from './home.config';
import HomeController from './home.controller';
import UserTableComponent from '../common/userTable/userTable.component';

let homeModule = angular.module('bpui.home', []);

homeModule.config(HomeConfig);
homeModule.controller('HomeController', HomeController);
homeModule.component('userTable', UserTableComponent);

export default homeModule = homeModule.name