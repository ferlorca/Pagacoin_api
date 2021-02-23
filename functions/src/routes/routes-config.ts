import { Application } from "express";
import authRoutes  from './auth-routes';
import configRoutes  from './config-routes';

export function routesConfig(app: Application) {
    authRoutes(app);
    configRoutes(app);
}