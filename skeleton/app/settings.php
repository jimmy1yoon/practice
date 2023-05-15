<?php

use DI\Container;
use Monolog\Logger;

return function (Container $container) {
    $container->set('settings', function () {
        return [
            'name' => 'Example Slim Application',
            'displayErrorDetails' => true,
            // Should be set to false in production
            'logError' => true,
            'logErrorDetails' => true,
            'logger' => [
                'name' => 'slim-app',
                'path' => __DIR__.'/../logs/app.log',
                'level' => Logger::DEBUG
            ],
            'view' => [
                'path' => __DIR__ . '/../src/Views',
                'settings' => ['cache' => false],
            ]
        ];
    });
}


?>