<?php
phpinfo();
// use MyApp\person;
// use MyApp\Student;

// use Psr\Http\Message\ResponseInterface as Response;
// use Psr\Http\Message\ServerRequestInterface as Request;
// use Slim\Factory\AppFactory;


//     define('__PUBLIC__', __DIR__); 
//     define('__ROOT__', dirname(__DIR__)); // dirname : 파일명을 제외한 경로
//     define('__APP__', __ROOT__."/src");

//     require_once __ROOT__.'/vendor/autoload.php';    
    
//     // // load config
//     // $container = new MyApp\Container();

//     // //$container->person->student();

    
//     // $person = $container->get('person');
    
//     // $person->choose()
//     // // $container->server->run();
//     // // $sample = new student();
//     // // $sample_get = new get();
//     // // $sample_get->print_get();

//     // person, student 클래스 적용 

//     $app = AppFactory::create();

//     $app->get('/', function (Request $request, Response $response, $args) {
        
//         $response->getBody()->write("Hello world!");

//         return $response;
//     });

//     $app->get('/hello/{name}', function (Request $request, Response $response) {
//         $name = $request->getAttribute('name');
//         $response->getBody()->write("Hello, $name");

//         return $response;
//     });

//     $app->get('/foo', function (Request $request, Response $response, array $args) {
//         $payload = json_encode(['hello' => 'world'], JSON_PRETTY_PRINT);
//         $response->getBody()->write($payload);

//         $payload2 = json_encode(['hello111' => 'world2222'], JSON_PRETTY_PRINT);
//         $response->getBody()->write($payload2);

//         return $response->withHeader('Content-Type', 'application/json');
//     });


//     $app->run();

    
?>

