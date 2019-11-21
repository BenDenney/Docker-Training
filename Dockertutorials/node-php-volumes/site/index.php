<html>
    <body>
        <h1>Team of all the players:</h1>
        <ol>
        <?php 
            
            $json = file_get_contents('http://players');
            $players = json_decode($json)->players;

            foreach($players as $player) { 
                echo "<li>$player</li>";
             }
             
            /* Can place the $players variable defined into the foreach function, then the $json variable in the $players variable itself too: we can then delete the variable declarations to tidy up the code.
            
            
            for (json_decode(file_get_contents('http://players'))->players as $player) { 
                echo "<li>$player<li>";
            } */
        ?>
        </ol>
    </body>
</html>