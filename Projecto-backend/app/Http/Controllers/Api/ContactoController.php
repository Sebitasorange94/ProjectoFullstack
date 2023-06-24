<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Contacto;

class ContactoController extends Controller
{
    public function read(Request $request){
        $user = new Contacto();
        
        if($request->query("id")){
            $contacto = $user->find($request->query("id"));
        }else{
            $contacto = $user->all();
        }

        return response()->json($contacto);
        
        // $data = $user->all();
        // return $data;    
    }

    public function create(Request $request){
        $user = new Contacto();

        $user->name = $request->input("name");
        $user->mail = $request->input("mail");
        $user->phone = $request->input("phone");
        $user->message = $request->input("message");
        $user->contactType = $request->input("contacType");
        $user->save();
        $message=["message" => "¡Registro Exitoso!"];
        return response()->json($message,Response::HTTP_OK);

    }
}
