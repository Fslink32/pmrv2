<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class artikel extends Controller
{
    public function artikel()
    {
        return view('backend.artikel.list_v');
    }
}
