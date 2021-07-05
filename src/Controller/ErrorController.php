<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;

class ErrorController extends AbstractController
{
    public function index(): RedirectResponse
    {
        return $this->redirectToRoute('index', [], 301);
    }
}
