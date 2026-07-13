<?php

namespace App\Enums;

enum UserRole: string
{
    case Visiteur = 'visiteur';
    case Investisseur = 'investisseur';
    case Exportateur = 'exportateur';
    case Gestionnaire = 'gestionnaire';
}