<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
    $code = $_GET['code'];

    $oAuthRequest = [
        'code' => $code,
        'grant_type' =>  'authorization_code',
        'client_id' => $clientId,
        'client_secret' => $clientSecret,
        'redirect_uri' => $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'],
        'scope' => 'api'
    ];

    $curl = curl_init($oAuthServer);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $oAuthRequest);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $jsonOAuthResponse = curl_exec($curl);
    $statusCode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);

    $oAuthResponse = json_decode($jsonOAuthResponse, true);
    save('OAuth Access Token (permanent)', $statusCode, $oAuthResponse);
    $oauthAccessToken = $oAuthResponse['access_token'];  // secret permanent token

		print_r($oAuthResponse);

    return $this->render('index/index.html.twig', [
        'controller_name' => 'ConnectAPIController',
    	]);
	}


  public function getApiAccesToken(): Response
  {
    /**
     * Get API Access Token (short-term access token)
     */
    $curl = curl_init($apiAccessTokenUrl);
    curl_setopt($curl, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $oauthAccessToken]);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $jsonAccessTokenResponse = curl_exec($curl);
    $statusCode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);

    $accessTokenResponse = json_decode($jsonAccessTokenResponse, true);
    save('Access Token (valid for 30 minutes)', $statusCode, $accessTokenResponse);
    $apiAccessToken = $accessTokenResponse['access_token']; // short term token

		print_r($accessTokenResponse);

  }


  public function getEshopIdentity() : Response
  {
    /**
     * Get eshop identity - call API
     */
    $curl = curl_init("https://api.myshoptet.com/api/eshop");
    curl_setopt($curl, CURLOPT_HTTPHEADER, [
      "Shoptet-Access-Token: $apiAccessToken",
        "Content-Type: application/vnd.shoptet.v1.0"
    ]);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $jsonEndpointResponse = curl_exec($curl);
    $endpointResponse = json_decode($jsonEndpointResponse, true);
    $statusCode = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);

    save('Eshop info', $statusCode, $endpointResponse);
    $eshopId = $data['data']['contactInformation']['eshopId'];

		print_r($endpointResponse);
  }
}
