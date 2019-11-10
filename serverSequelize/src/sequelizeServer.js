// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import { type Articleee, ArticlesModel, syncModels } from './models.js';

const public_path = path.join(__dirname, '/../../client/public');

let app = express();

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json



export let listen = new Promise<void>((resolve, reject) => {
    console.log("yo");
    // Wait for Sequalize to connect to and initialize the database
    syncModels.then(() => {
        let call_listen = reloader => {
            app.listen(3000, (error: ?Error) => {
                if (error) reject(error.message);
                console.log('Express server started');
                // Start hot reload (refresh web page on client changes) when not in production environment
                if (reloader) {
                    reloader.reload(); // Reload application on server restart
                    fs.watch(public_path, () => reloader.reload());
                }
                resolve();
            });
        };
        // Setup hot reload (refresh web page on client changes) when not in production environment,
        // and then start the web server.
        if (process.env.NODE_ENV != 'production') reload(app).then(reloader => call_listen(reloader));
        else call_listen();
    });
});
