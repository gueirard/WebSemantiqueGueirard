<?php
    session_start();
    if (isset($_SESSION["id"])) {
		
        echo '<div><span>Bienvenue ! '.$_SESSION["prenom"];
		echo '<br/>';
		echo '<img src="'.$_SESSION['profilepic'].'">';
		echo '<br/>';
		echo '<a href="logout.php">Logout</a>';
    } else {
        echo '<div id="header">
        <form id="search" action="req_login.php" method="post">
        <label>Email <input type="text" name="email" id="email"></label>
        <label>Mot de passe<input type="password" name="password" id="password"></label>
        <input type="submit" class="submit" value="Login">
        <a href="inscription.php">Inscription</a>
        </form>
        </div>';
		
    }
?>
