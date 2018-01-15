<?php 

require 'vendor/autoload.php';  

$client = new \GuzzleHttp\Client();
$res = $client->request('GET', 'https://api.github.com/repos/guzzle/guzzle');

// Send an asynchronous request.
$request = new \GuzzleHttp\Psr7\Request('GET', 'https://api.bitvalor.com/v1/ticker.json');
$promise = $client->sendAsync($request)->then(function ($response) {
    echo $response->getBody();
    json_decode($response->getBody());
});

$promise->wait();


?>