<?php

namespace App\Model\ApiEndpoints;

/**
 * Model na Getnutie vsetkych objednavok
 */
class GetOrders
{

  public function getOrders($accessToken, $dates)
  {
    $dateCreatedFrom = date_create($dates[0]);
    $dateCreatedTo = date_create($dates[1]);

    $dateFormatedFrom = date_format($dateCreatedFrom, 'c');
    $dateFormatedTo = date_format($dateCreatedTo, 'c');

    $dateFrom = urlencode($dateFormatedFrom);
    $dateTo = urlencode($dateFormatedTo);
    
      $curl = curl_init();

      curl_setopt($curl, CURLOPT_URL, "https://api.myshoptet.com/api/orders?creationTimeFrom=".$dateFrom."&creationTimeTo=".$dateTo);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($curl, CURLOPT_HEADER, FALSE);

      curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Shoptet-Access-Token: $accessToken",
        "Content-Type: application/vnd.shoptet.v1.0"
      ));

      $response = curl_exec($curl);
      curl_close($curl);

      $orders = json_decode($response, true);

      return $orders;

  }

}