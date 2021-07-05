<?php

namespace App\Controller;

// Moje Models
use App\Model\ApiEndpoints\GetOrders;
use App\Model\ApiEndpoints\GetOrdersDetails;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;

class ConnectAPIController extends AbstractController
{

  private $clientId = 'dkcnjb1j7505v695';
  private $clientSecret = 'btawa6pkn9pubjzp615is5t2ofmuoozx';
  private $oAuthServer = 'https://neoship.myshoptet.com/action/ApiOAuthServer/token';
  private $apiAccessTokenUrl = 'https://neoship.myshoptet.com/action/ApiOAuthServer/getAccessToken';

  public function save($caption, $code, $struct) {
    $entry = sprintf("%s %s: %d\n%0s", date('c'), $caption, $code, print_r($struct, true));
    file_put_contents('log.txt', $entry, FILE_APPEND);
  }

  /**
   * @Route("/shoptet-installation", name="connectApi")
   */
  public function index(): Response
  {

    /**
     * Get OAuth Access Token (long-term secret token)
     * INSTALACIA
     */
    // $code = $_GET['code'];

    // $oAuthRequest = [
    //     'code' => $code,
    //     'grant_type' =>  'authorization_code',
    //     'client_id' => $clientId,
    //     'client_secret' => $clientSecret,
    //     'redirect_uri' => $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'],
    //     'scope' => 'api'
    // ];

    // $curl = curl_init($oAuthServer);
    // curl_setopt($curl, CURLOPT_POST, true);
    // curl_setopt($curl, CURLOPT_POSTFIELDS, $oAuthRequest);
    // curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    // $jsonOAuthResponse = curl_exec($curl);
    // $statusCode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    // curl_close($curl);

    // $oAuthResponse = json_decode($jsonOAuthResponse, true);
    // save('OAuth Access Token (permanent)', $statusCode, $oAuthResponse);
    // $oauthAccessToken = $oAuthResponse['access_token'];  // secret permanent token

		// print_r($oAuthResponse);

    // return $this->render('index/index.html.twig', [
    //     'controller_name' => 'ConnectAPIController',
    // 	]);

    echo "tu sa nainstaluje doplnok + e-shop <br>";
    return $this->getApiAccesToken();
      
	}


  public function getApiAccesToken(): RedirectResponse
  {
    /**
     * Get API Access Token (short-term access token)
     */
    // $curl = curl_init($apiAccessTokenUrl);
    // curl_setopt($curl, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $oauthAccessToken]);
    // curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    // $jsonAccessTokenResponse = curl_exec($curl);
    // $statusCode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    // curl_close($curl);

    // $accessTokenResponse = json_decode($jsonAccessTokenResponse, true);
    // save('Access Token (valid for 30 minutes)', $statusCode, $accessTokenResponse);
    // $apiAccessToken = $accessTokenResponse['access_token']; // short term token

		// print_r($accessTokenResponse);

    echo "tu bude ziskanie docasneho OAuth a jeho rekapitulacia <br>";
    $this->getAllOrders();
    return $this->redirectToRoute('index', [], 301);

  }

  /**
   * @Route("/api/all-orders", name="allOrders")
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   */
  public function getAllOrders()
  {
    /**
     * Get Orders z Model GetOrders.php
     */
    $accessToken = "450738-a-644-twrsyh61qwxqyco6cksjbkad2x5m5c1i";

    $getOrders = new GetOrders;
    $allOrders = $getOrders->getOrders($accessToken);

    $response = new Response();
    $response->headers->set('Content-Type', 'application/json');
    $response->headers->set('Access-Control-Allow-Origin', '*');
    $response->setContent(json_encode($allOrders));

    return $response;

  }

  /**
   * @Route("/api/orders-detail", name="ordersDetail")
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   */
  public function getOrdersDetails(Request $request)
  {
    /**
     * Get Orders detail z Model GetOrdersDetails.php
     */
    $code = json_decode($request->headers->get('Orders-Codes'));
    $accessToken = "450738-a-644-twrsyh61qwxqyco6cksjbkad2x5m5c1i";

    $getOrders = new getOrdersDetails;
    $ordersDetails = $getOrders->getOrdersDetails($accessToken, $code);

    $response = new Response();
    $response->headers->set('Content-Type', 'application/json');
    $response->headers->set('Access-Control-Allow-Origin', '*');
    $response->setContent(json_encode($ordersDetails));

    return $response;

  }
}
