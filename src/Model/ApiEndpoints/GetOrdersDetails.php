<?php

namespace App\Model\ApiEndpoints;

/**
 * Model na Getnutie vsetkych objednavok
 */
class GetOrdersDetails
{
  public function getOrdersDetails($accessToken, $code)
  {
    $arrOfOrdersDetails = [];
    foreach($code as $value){
      $curl = curl_init();

      curl_setopt($curl, CURLOPT_URL, "https://api.myshoptet.com/api/orders/" . $value );
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($curl, CURLOPT_HEADER, FALSE);

      curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Shoptet-Access-Token: $accessToken",
        "Content-Type: application/vnd.shoptet.v1.0"
      ));

      $response = curl_exec($curl);
      curl_close($curl);

      $ordersDetails = json_decode($response, true);

      array_push($arrOfOrdersDetails, $ordersDetails);
    }
    return $arrOfOrdersDetails;
  }
}