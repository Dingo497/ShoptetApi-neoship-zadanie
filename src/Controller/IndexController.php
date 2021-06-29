<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
  /**
   * @Route("/{reactRouting}", name="index", defaults={"reactRouting":null})
   */
  public function index(): Response
  {

    

    return $this->render('index/index.html.twig', [
        'controller_name' => 'IndexController',
    ]);
  }




  /**
     * @Route("/api/users", name="users")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsers()
    {
        $users = [
            [
                'id' => 1,
                'name' => 'Olususi Oluyemi',
                'sum' => 74,
                'country' => 'Slovakia'
            ],
            [
                'id' => 2,
                'name' => 'Camila Terry',
                'sum' => 74,
                'country' => 'Germany'
            ],
            [
                'id' => 3,
                'name' => 'Joel Williamson',
                'sum' => 74,
                'country' => 'Hungary'
            ],
            [
                'id' => 4,
                'name' => 'Deann Payne',
                'sum' => 74,
                'country' => 'Slovakia'
            ],
            [
                'id' => 5,
                'name' => 'Donald Perkins',
                'sum' => 74,
                'country' => 'USA'
            ],
            [
                'id' => 6,
                'name' => 'Donald Perkins',
                'sum' => 74,
                'country' => 'USA'
            ]
        ];
    
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($users));
        
        return $response;
    }

}
