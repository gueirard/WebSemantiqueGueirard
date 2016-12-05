<?php
    $email=stripslashes($_POST['email']);
    $password=stripslashes($_POST['password']);

    // Connect to server and select database.
    $dbh = new PDO('mysql:host=localhost;dbname=pictionnary', 'test', 'test');

  

    // ensuite on requête à nouveau la base pour l'utilisateur qui vient d'être inscrit, et
    $sql = $dbh->query("SELECT u.id, u.email, u.nom, u.prenom, u.couleur, u.profilepic FROM USERS u WHERE u.email='".$email."' AND u.password='".$password."'", PDO::FETCH_OBJ);
    if ($sql->rowCount() > 0 )  {
		  session_start();
        // on récupère la ligne qui nous intéresse avec $sql->fetch(),
        // et on enregistre les données dans la session avec $_SESSION["..."]=...
		
        //$result = $sql->fetch(PDO::FETCH_ASSOC);
				foreach ($sql as $res){
                $_SESSION["nom"] = $res->nom;
                $_SESSION["prenom"] = $res->prenom;
				$_SESSION["id"] = $res->id;           
                $_SESSION["profilepic"] = $res->profilepic;
				}
		header("Location: main.php");
		exit();
    }
	
	else {
		header("Location: main.php");
		exit();
	}
    
?>