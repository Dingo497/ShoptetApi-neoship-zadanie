<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TemporaryOauthController extends AbstractController
{
    #[Route('/temporary/oauth', name: 'temporary_oauth')]
    public function index(): Response
    {
        return $this->render('temporary_oauth/index.html.twig', [
            'controller_name' => 'TemporaryOauthController',
        ]);
    }
}
