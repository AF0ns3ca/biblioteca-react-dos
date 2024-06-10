<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // -------------------------------- Roles --------------------------------
        Role::create([
            'id' => 1,
            'role' => 'admin'
        ]);
        Role::create([
            'id' => 2,
            'role' => 'user'
        ]);
        Role::create([
            'id' => 3,
            'role' => 'premium_user'
        ]);


        // -------------------------------- Users --------------------------------
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Basic',
            'email' => 'basic@basic.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Premium',
            'email' => 'premium@premium.com',
            'password' => Hash::make('password'),
        ]);

        User::find(1)->roles()->attach(1);
        User::find(2)->roles()->attach(2);
        User::find(3)->roles()->attach(3);


        // -------------------------------- Books --------------------------------
        Book::create([
            'titulo' => 'La Comunidad del Anillo',
            'autor' => 'J.R.R. Tolkien',
            'serie' => 'El Señor de los Anillos',
            'num_serie' => 1,
            'descripcion' => 'La Comunidad del Anillo se ha formado para destruir el Anillo Único y acabar con el poder de Sauron. La Comunidad está formada por nueve miembros, entre los que se encuentran Frodo Bolsón, Gandalf, Aragorn, Legolas, Gimli, Boromir, Sam, Merry y Pippin. Juntos, se enfrentarán a diferentes peligros en su camino hacia Mordor.',
            'paginas' => 424,
            'portada' => 'https://m.media-amazon.com/images/I/91GGJZ19aEL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Las Dos Torres',
            'autor' => 'J.R.R. Tolkien',
            'serie' => 'El Señor de los Anillos',
            'num_serie' => 2,
            'descripcion' => 'La Comunidad del Anillo ha sido disuelta. El portador del anillo Frodo y su fiel amigo Sam se dirigen hacia Mordor para destruir el Anillo Único y acabar con el poder de Sauron. Mientras, y tras la disolución de la Comunidad, los demás miembros se enfrentan a diferentes peligros en su camino hacia la guerra contra Sauron y su aliado Saruman.',
            'paginas' => 352,
            'portada' => 'https://m.media-amazon.com/images/I/81RkiVmGUXL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'El Retorno del Rey',
            'autor' => 'J.R.R. Tolkien',
            'serie' => 'El Señor de los Anillos',
            'num_serie' => 3,
            'descripcion' => 'La última parte de la trilogía de El Señor de los Anillos, en la que se produce la gran batalla final por la Tierra Media. Mientras, Frodo y Sam continúan su camino hacia Mordor, donde deben destruir el Anillo Único.',
            'paginas' => 416,
            'portada' => 'https://m.media-amazon.com/images/I/81UZ2WW4oWL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Harry Potter y la Piedra Filosofal',
            'autor' => 'J.K. Rowling',
            'serie' => 'Harry Potter',
            'num_serie' => 1,
            'descripcion' => 'Harry Potter es un niño huérfano que vive con sus crueles tíos, los Dursley. Un día, recibe una carta que cambiará su vida para siempre: ha sido aceptado en el Colegio Hogwarts de Magia y Hechicería. Allí, Harry descubrirá que es un mago y que es famoso en el mundo mágico por haber sobrevivido al ataque de Lord Voldemort cuando era un bebé. Junto a sus nuevos amigos Ron y Hermione, Harry vivirá emocionantes aventuras y descubrirá la verdad sobre la muerte de sus padres.',
            'paginas' => 256,
            'portada' => 'https://m.media-amazon.com/images/I/81DIK77B0PL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Harry Potter y la Cámara Secreta',
            'autor' => 'J.K. Rowling',
            'serie' => 'Harry Potter',
            'num_serie' => 2,
            'descripcion' => 'Harry Potter regresa a Hogwarts para su segundo año de estudios. Sin embargo, la tranquilidad de la escuela se ve amenazada por la aparición de mensajes escritos con sangre en las paredes del colegio. Harry y sus amigos Ron y Hermione investigarán el misterio de la Cámara de los Secretos y descubrirán la verdad sobre el pasado de Lord Voldemort.',
            'paginas' => 288,
            'portada' => 'https://m.media-amazon.com/images/I/81RRGu2MlDL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Harry Potter y el Prisionero de Azkaban',
            'autor' => 'J.K. Rowling',
            'serie' => 'Harry Potter',
            'num_serie' => 3,
            'descripcion' => 'Harry Potter regresa a Hogwarts para su tercer año de estudios. Sin embargo, la llegada de un peligroso prisionero a la escuela pondrá en peligro la vida de Harry. El prisionero de Azkaban, Sirius Black, es un mago oscuro que ha escapado de la prisión de Azkaban y busca venganza contra Harry. Junto a sus amigos Ron y Hermione, Harry descubrirá la verdad sobre su pasado y se enfrentará a su destino.',
            'paginas' => 320,
            'portada' => 'https://m.media-amazon.com/images/I/81RwW60cz5L._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Harry Potter y el Cáliz de Fuego',
            'autor' => 'J.K. Rowling',
            'serie' => 'Harry Potter',
            'num_serie' => 4,
            'descripcion' => 'Harry Potter es seleccionado para participar en el Torneo de los Tres Magos, un peligroso concurso en el que los campeones deben enfrentarse a diferentes pruebas mágicas. Sin embargo, Harry descubrirá que el torneo esconde un oscuro secreto y que su vida corre peligro. Junto a sus amigos Ron y Hermione, Harry se enfrentará a su mayor desafío hasta el momento.',
            'paginas' => 640,
            'portada' => 'https://m.media-amazon.com/images/I/81IbaHcIyxL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Harry Potter y la Orden del Fénix',
            'autor' => 'J.K. Rowling',
            'serie' => 'Harry Potter',
            'num_serie' => 5,
            'descripcion' => 'Harry Potter regresa a Hogwarts para su quinto año de estudios. Sin embargo, la llegada de Lord Voldemort y sus seguidores, los mortífagos, pondrá en peligro la vida de Harry y sus amigos. La Orden del Fénix, una organización secreta formada por magos y brujas que luchan contra Voldemort, se reúne para proteger a Harry y prepararlo para la batalla final contra el Señor Tenebroso.',
            'paginas' => 896,
            'portada' => 'https://m.media-amazon.com/images/I/81CF1f+LiSL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Harry Potter y el Misterio del Príncipe',
            'autor' => 'J.K. Rowling',
            'serie' => 'Harry Potter',
            'num_serie' => 6,
            'descripcion' => 'Harry Potter regresa a Hogwarts para su sexto año de estudios. Sin embargo, la llegada de un nuevo profesor de pociones y la aparición de un misterioso libro de hechizos pondrán en peligro la vida de Harry y sus amigos. El príncipe mestizo, un misterioso mago que ha dejado anotaciones en el libro de hechizos, revelará secretos sobre el pasado de Lord Voldemort y la verdadera naturaleza de la magia oscura.',
            'paginas' => 608,
            'portada' => 'https://m.media-amazon.com/images/I/81F0wo3gBfL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Harry Potter y las Reliquias de la Muerte',
            'autor' => 'J.K. Rowling',
            'serie' => 'Harry Potter',
            'num_serie' => 7,
            'descripcion' => 'Harry Potter se enfrenta a su mayor desafío: la batalla final contra Lord Voldemort. Con la ayuda de sus amigos Ron y Hermione, Harry deberá encontrar y destruir los Horrocruxes, los objetos en los que Voldemort ha ocultado parte de su alma. Solo cuando los Horrocruxes sean destruidos, Harry podrá enfrentarse al Señor Tenebroso y acabar con su reinado de terror.',
            'paginas' => 640,
            'portada' => 'https://m.media-amazon.com/images/I/81O+ojsFotL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'El Hobbit',
            'autor' => 'J.R.R. Tolkien',
            'serie' => 'El Hobbit',
            'num_serie' => 1,
            'descripcion' => 'El Hobbit es una novela de fantasía escrita por J.R.R. Tolkien. Narra las aventuras del hobbit Bilbo Bolsón, quien se embarca en una misión para recuperar el tesoro de los enanos que ha sido robado por el dragón Smaug. En su camino, Bilbo se encontrará con trolls, trasgos, elfos y arañas gigantes.',
            'paginas' => 304,
            'portada' => 'https://m.media-amazon.com/images/I/9116F++x55L._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Alas de Sangre',
            'autor' => 'Rebecca Yarros',
            'serie' => 'Empíreo',
            'num_serie' => 1,
            'descripcion' => 'Alas de Sangre es la primera entrega de la serie Empíreo, una saga de fantasía épica que combina romance, acción y aventura. En un mundo dividido por la guerra entre ángeles y demonios, la joven Lira se verá envuelta en una trama de traición y venganza que pondrá a prueba su lealtad y su valentía.',
            'paginas' => 736,
            'portada' => 'https://m.media-amazon.com/images/I/91UJR77PRFL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Alas de Fuego',
            'autor' => 'Rebecca Yarros',
            'serie' => 'Empíreo',
            'num_serie' => 2,
            'descripcion' => 'Alas de Fuego es la segunda entrega de la serie Empíreo, una saga de fantasía épica que combina romance, acción y aventura. En un mundo dividido por la guerra entre ángeles y demonios, la joven Lira se verá envuelta en una trama de traición y venganza que pondrá a prueba su lealtad y su valentía.',
            'paginas' => 896,
            'portada' => 'https://m.media-amazon.com/images/I/91BW1X31yIL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'El Imperio Final',
            'autor' => 'Brandon Sanderson',
            'serie' => 'Nacidos de la Bruma (Cosmere)',
            'num_serie' => 1,
            'descripcion' => 'El Imperio Final es la primera entrega de la saga Nacidos de la Bruma, una serie de fantasía épica ambientada en un mundo dominado por un imperio tiránico y gobernado por un dios oscuro. Vin, una joven esclava con poderes mágicos, se unirá a un grupo de rebeldes para derrocar al Lord Legislador y liberar al mundo de su opresión.',
            'paginas' => 672,
            'portada' => 'https://m.media-amazon.com/images/I/816IVfekyGL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'El Pozo de la Ascensión',
            'autor' => 'Brandon Sanderson',
            'serie' => 'Nacidos de la Bruma (Cosmere)',
            'num_serie' => 2,
            'descripcion' => 'El Pozo de la Ascensión es la segunda entrega de la saga Nacidos de la Bruma, una serie de fantasía épica ambientada en un mundo dominado por un imperio tiránico y gobernado por un dios oscuro. Vin, una joven esclava con poderes mágicos, se unirá a un grupo de rebeldes para derrocar al Lord Legislador y liberar al mundo de su opresión.',
            'paginas' => 784,
            'portada' => 'https://m.media-amazon.com/images/I/8138O0TPY5L._SL1500_.jpg',
        ]);
        
        Book::create([
            'titulo' => 'El Héroe de las Eras',
            'autor' => 'Brandon Sanderson',
            'serie' => 'Nacidos de la Bruma (Cosmere)',
            'num_serie' => 3,
            'descripcion' => 'El Héroe de las Eras es la tercera entrega de la saga Nacidos de la Bruma, una serie de fantasía épica ambientada en un mundo dominado por un imperio tiránico y gobernado por un dios oscuro. Vin, una joven esclava con poderes mágicos, se unirá a un grupo de rebeldes para derrocar al Lord Legislador y liberar al mundo de su opresión.',
            'paginas' => 760,
            'portada' => 'https://m.media-amazon.com/images/I/81c5VPXgDqL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'El Camino de los Reyes',
            'autor' => 'Brandon Sanderson',
            'serie' => 'El Archivo de las Tormentas (Cosmere)',
            'num_serie' => 1,
            'descripcion' => 'El Camino de los Reyes es la primera entrega de la saga El Archivo de las Tormentas, una serie de fantasía épica ambientada en un mundo devastado por tormentas mágicas y habitado por seres sobrenaturales. Kaladin, un joven esclavo con un pasado oscuro, se unirá a un grupo de guerreros para proteger a su pueblo de la invasión de los Parshendi.',
            'paginas' => 1200,
            'portada' => 'https://m.media-amazon.com/images/I/91jOSMOea0L._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Palabras Radiantes',
            'autor' => 'Brandon Sanderson',
            'serie' => 'El Archivo de las Tormentas (Cosmere)',
            'num_serie' => 2,
            'descripcion' => 'Palabras Radiantes es la segunda entrega de la saga El Archivo de las Tormentas, una serie de fantasía épica ambientada en un mundo devastado por tormentas mágicas y habitado por seres sobrenaturales. Kaladin, un joven esclavo con un pasado oscuro, se unirá a un grupo de guerreros para proteger a su pueblo de la invasión de los Parshendi.',
            'paginas' => 1200,
            'portada' => 'https://m.media-amazon.com/images/I/81LBim3i3HL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Juramentada',
            'autor' => 'Brandon Sanderson',
            'serie' => 'El Archivo de las Tormentas (Cosmere)',
            'num_serie' => 3,
            'descripcion' => 'Juramentada es la tercera entrega de la saga El Archivo de las Tormentas, una serie de fantasía épica ambientada en un mundo devastado por tormentas mágicas y habitado por seres sobrenaturales. Kaladin, un joven esclavo con un pasado oscuro, se unirá a un grupo de guerreros para proteger a su pueblo de la invasión de los Parshendi.',
            'paginas' => 1280,
            'portada' => 'https://m.media-amazon.com/images/I/91aS6KfXULL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'El Ritmo de la Guerra',
            'autor' => 'Brandon Sanderson',
            'serie' => 'El Archivo de las Tormentas (Cosmere)',
            'num_serie' => 4,
            'descripcion' => 'El Ritmo de la Guerra es la cuarta entrega de la saga El Archivo de las Tormentas, una serie de fantasía épica ambientada en un mundo devastado por tormentas mágicas y habitado por seres sobrenaturales. Kaladin, un joven esclavo con un pasado oscuro, se unirá a un grupo de guerreros para proteger a su pueblo de la invasión de los Parshendi.',
            'paginas' => 1280,
            'portada' => 'https://m.media-amazon.com/images/I/91Nb4w7arrL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'El Aliento de los Dioses',
            'autor' => 'Brandon Sanderson',
            'serie' => 'Cosmere',
            'num_serie' => 0,
            'descripcion' => 'El Aliento de los Dioses es una de las primeras entregas de la saga Cosmere, una serie de fantasía épica ambientada en un mundo devastado por tormentas mágicas y habitado por seres sobrenaturales. Kaladin, un joven esclavo con un pasado oscuro, se unirá a un grupo de guerreros para proteger a su pueblo de la invasión de los Parshendi.',
            'paginas' => 749,
            'portada' => 'https://m.media-amazon.com/images/I/71w0BArZnwL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Steelheart',
            'autor' => 'Brandon Sanderson',
            'serie' => 'Reckoners',
            'num_serie' => 1,
            'descripcion' => 'Steelheart es la primera entrega de la saga Reckoners, una serie de ciencia ficción y fantasía que combina acción, aventura y misterio. En un mundo dominado por seres superpoderosos conocidos como Épicos, David se unirá a un grupo de rebeldes para derrocar al tirano Steelheart y liberar a la humanidad de su opresión.',
            'paginas' => 416,
            'portada' => 'https://m.media-amazon.com/images/I/81wHfZWqLtL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Firefight',
            'autor' => 'Brandon Sanderson',
            'serie' => 'Reckoners',
            'num_serie' => 2,
            'descripcion' => 'Firefight es la segunda entrega de la saga Reckoners, una serie de ciencia ficción y fantasía que combina acción, aventura y misterio. En un mundo dominado por seres superpoderosos conocidos como Épicos, David se unirá a un grupo de rebeldes para derrocar al tirano Steelheart y liberar a la humanidad de su opresión.',
            'paginas' => 416,
            'portada' => 'https://m.media-amazon.com/images/I/8132iYjL2eL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Calamity',
            'autor' => 'Brandon Sanderson',
            'serie' => 'Reckoners',
            'num_serie' => 3,
            'descripcion' => 'Calamity es la tercera y última entrega de la saga Reckoners, una serie de ciencia ficción y fantasía que combina acción, aventura y misterio. En un mundo dominado por seres superpoderosos conocidos como Épicos, David se unirá a un grupo de rebeldes para derrocar al tirano Steelheart y liberar a la humanidad de su opresión.',
            'paginas' => 432,
            'portada' => 'https://m.media-amazon.com/images/I/81JYZN2ZwrL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Gente Normal',
            'autor' => 'Sally Rooney',
            'serie' => 'Gente Normal',
            'num_serie' => 1,
            'descripcion' => 'Gente Normal es una novela de la autora irlandesa Sally Rooney que narra la historia de Marianne y Connell, dos jóvenes que se conocen en el instituto y entablan una relación complicada y apasionada. A lo largo de los años, Marianne y Connell se enfrentarán a diferentes obstáculos en su camino hacia la madurez y el amor verdadero.',
            'paginas' => 304,
            'portada' => 'https://m.media-amazon.com/images/I/615pcyBn1uL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'It (Eso)',
            'autor' => 'Stephen King',
            'descripcion' => 'It (Eso) es una novela de terror del escritor estadounidense Stephen King que narra la historia de un grupo de niños que se enfrentan a un ser maligno que se alimenta del miedo y la violencia. A lo largo de los años, los niños se convierten en adultos y regresan a su pueblo natal para enfrentarse a sus peores pesadillas.',
            'paginas' => 1536,
            'portada' => 'https://m.media-amazon.com/images/I/81HKMoh8m0L._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Cementerio de Animales',
            'autor' => 'Stephen King',
            'descripcion' => 'Cementerio de Animales es una novela de terror del escritor estadounidense Stephen King que narra la historia de una familia que se muda a un pueblo rural y descubre un antiguo cementerio de animales que tiene el poder de devolver a la vida a los muertos. A lo largo de los años, la familia se enfrentará a terribles consecuencias por desafiar a la muerte.',
            'paginas' => 424,
            'portada' => 'https://m.media-amazon.com/images/I/91huqmxFBaL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'El Resplandor',
            'autor' => 'Stephen King',
            'descripcion' => 'El Resplandor es una novela de terror del escritor estadounidense Stephen King que narra la historia de una familia que se muda a un hotel aislado en las montañas y descubre que el lugar está embrujado por espíritus malignos. A lo largo de los años, la familia se enfrentará a terribles visiones y pesadillas que pondrán a prueba su cordura y su amor.',
            'paginas' => 544,
            'portada' => 'https://m.media-amazon.com/images/I/81z8cAON-gL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'El Pistolero',
            'autor' => 'Stephen King',
            'serie' => 'La Torre Oscura',
            'num_serie' => 1,
            'descripcion' => 'El Pistolero es la primera entrega de la saga La Torre Oscura, una serie de fantasía épica ambientada en un mundo postapocalíptico y habitado por seres sobrenaturales. Roland Deschain, un pistolero solitario en busca de la Torre Oscura, se enfrentará a peligros y desafíos en su camino hacia el fin del mundo.',
            'paginas' => 288,
            'portada' => 'https://m.media-amazon.com/images/I/91JkvU5k5ZL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'La Llegada de los Tres',
            'autor' => 'Stephen King',
            'serie' => 'La Torre Oscura',
            'num_serie' => 2,
            'descripcion' => 'La Llegada de los Tres es la segunda entrega de la saga La Torre Oscura, una serie de fantasía épica ambientada en un mundo postapocalíptico y habitado por seres sobrenaturales. Roland Deschain, un pistolero solitario en busca de la Torre Oscura, se enfrentará a peligros y desafíos en su camino hacia el fin del mundo.',
            'paginas' => 432,
            'portada' => 'https://m.media-amazon.com/images/I/81nYje0JlML._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Las Tierras Baldías',
            'autor' => 'Stephen King',
            'serie' => 'La Torre Oscura',
            'num_serie' => 3,
            'descripcion' => 'Las Tierras Baldías es la tercera entrega de la saga La Torre Oscura, una serie de fantasía épica ambientada en un mundo postapocalíptico y habitado por seres sobrenaturales. Roland Deschain, un pistolero solitario en busca de la Torre Oscura, se enfrentará a peligros y desafíos en su camino hacia el fin del mundo.',
            'paginas' => 624,
            'portada' => 'https://m.media-amazon.com/images/I/81Wh8nemTXL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Mago y Cristal',
            'autor' => 'Stephen King',
            'serie' => 'La Torre Oscura',
            'num_serie' => 4,
            'descripcion' => 'Mago y Cristal es la cuarta entrega de la saga La Torre Oscura, una serie de fantasía épica ambientada en un mundo postapocalíptico y habitado por seres sobrenaturales. Roland Deschain, un pistolero solitario en busca de la Torre Oscura, se enfrentará a peligros y desafíos en su camino hacia el fin del mundo.',
            'paginas' => 768,
            'portada' => 'https://m.media-amazon.com/images/I/813NK78iHPL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Lobos del Calla',
            'autor' => 'Stephen King',
            'serie' => 'La Torre Oscura',
            'num_serie' => 5,
            'descripcion' => 'Lobos del Calla es la quinta entrega de la saga La Torre Oscura, una serie de fantasía épica ambientada en un mundo postapocalíptico y habitado por seres sobrenaturales. Roland Deschain, un pistolero solitario en busca de la Torre Oscura, se enfrentará a peligros y desafíos en su camino hacia el fin del mundo.',
            'paginas' => 816,
            'portada' => 'https://m.media-amazon.com/images/I/81+TdqRoLhL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'Canción de Susannah',
            'autor' => 'Stephen King',
            'serie' => 'La Torre Oscura',
            'num_serie' => 6,
            'descripcion' => 'Canción de Susannah es la sexta entrega de la saga La Torre Oscura, una serie de fantasía épica ambientada en un mundo postapocalíptico y habitado por seres sobrenaturales. Roland Deschain, un pistolero solitario en busca de la Torre Oscura, se enfrentará a peligros y desafíos en su camino hacia el fin del mundo.',
            'paginas' => 528,
            'portada' => 'https://m.media-amazon.com/images/I/81U2tQ1cMpL._SL1500_.jpg',
        ]);

        Book::create([
            'titulo' => 'La Torre Oscura',
            'autor' => 'Stephen King',
            'serie' => 'La Torre Oscura',
            'num_serie' => 7,
            'descripcion' => 'La Torre Oscura es la séptima y última entrega de la saga La Torre Oscura, una serie de fantasía épica ambientada en un mundo postapocalíptico y habitado por seres sobrenaturales. Roland Deschain, un pistolero solitario en busca de la Torre Oscura, se enfrentará a peligros y desafíos en su camino hacia el fin del mundo.',
            'paginas' => 864,
            'portada' => 'https://m.media-amazon.com/images/I/81VVLpIUYPL._SL1500_.jpg',
        ]);

    }
}
