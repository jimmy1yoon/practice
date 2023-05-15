<?php

use Slim\App;
use App\Application\Middleware\ExampleAfterMiddleware;
use App\Application\Middleware\ExampleBeforeMiddleware;

return function (App $app) {
    $settings = $app->getContainer()->get('settings');
    
    $app->addErrorMiddleware(
        $settings['displayErrorDetails'],
        $settings['logError'],
        $settings['logErrorDetails']
    );

    $app->addErrorMiddleware(true, true, false);
    $app->add(ExampleBeforeMiddleware::class);
    $app->add(ExampleAfterMiddleware::class);

};