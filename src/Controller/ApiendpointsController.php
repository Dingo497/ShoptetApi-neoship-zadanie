<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiendpointsController extends AbstractController
{
    #[Route('/apiendpoints', name: 'apiendpoints')]
    public function index(): Response
    {
        return $this->render('apiendpoints/index.html.twig', [
            'controller_name' => 'ApiendpointsController',
        ]);
    }
}
