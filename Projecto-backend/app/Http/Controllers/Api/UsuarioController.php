<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Usuario;


class UsuarioController extends Controller
{
    public function read(Request $request){
        $user = new Usuario();
        
        if($request->query("id")){
            $usuario = $user->find($request->query("id"));
        }else{
            $usuario = $user->all();
        }

        return response()->json($usuario);
        
        // $data = $user->all();
        // return $data;    
    }

    public function create(Request $request){
        $user = new Usuario();

        $user->name = $request->input("name");
        $user->tipoId = $request->input("tipoId");
        $user->numId = $request->input("numId");
        $user->phone = $request->input("phone");
        $user->mail = $request->input("mail");
        $user->profession = $request->input("profession");
        $user->userType = $request->input("userType");

        $user->save();
        $message=["message" => "¡Registro Exitoso!"];
        return response()->json($message,Response::HTTP_OK);

    }

    public function update(Request $request){

        $idUser = $request->query("id");
        $user = new Usuario();

        $usuario = $user->find($idUser);

        $usuario->name = $request->input("name");
        $usuario->tipoId = $request->input("tipoId");
        $usuario->numId = $request->input("numId");
        $usuario->phone = $request->input("phone");
        $usuario->mail = $request->input("mail");
        $usuario->profession = $request->input("profession");
        $usuario->userType = $request->input("userType");


        $usuario->save();

        $message=[
            "message" => "Actualización Exitosa!!",
            "idUser" => $request->query("id"),
            "nameUser"=>$usuario->name
        ];

        return $message;
    }

        

    public function delete(Request $request){

        $idUser = $request->query("id");
        $user = new Usuario();

        $usuario = $user->find($idUser);

        $usuario->delete();

        $message=[
            "message" => "Eliminación Exitosa!!",
            "idUser" => $request->query("id"),
        ];

        return $message;
    }

}






// $message = ["mensaje"=>"Hola mundo"];
// return response()->json($message);