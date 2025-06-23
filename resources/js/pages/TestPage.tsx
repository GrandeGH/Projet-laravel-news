Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi temporibus autem, ex possimus reiciendis nam consequatur eaque? Quod, saepe pariatur. Nemo architecto quisquam quae perspiciatis iure, iusto vel enim nisi vitae itaque voluptatibus pariatur laborum, reprehenderit qui neque perferendis dolores beatae porro laudantium eaque consequuntur facere distinctio molestiae? Beatae laboriosam fugiat nobis voluptate impedit nulla quae cum ex dolor eius cumque, dignissimos harum inventore molestias doloremque dolores laborum, quod illum totam error magnam facere rerum? Consequuntur suscipit eveniet ipsam aperiam ducimus repellendus ullam iste optio minus voluptatum alias culpa officia corporis, perferendis nostrum autem tenetur recusandae aliquid quidem doloremque facere.


<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>


// resources/css/app.css

@layer base {
    * {
        @apply border-border;
    }

    body {
        @apply bg-background text-foreground;
        background-image: url('/img/Bg_Tales_of_Arise.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        min-height: 100%;
        position: relative;
        background-color: rgba(0, 0, 0, 0.5); /* opacité noire */
        z-index: 0;
    }

    body::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* opacité noire */
        z-index: -1;
        pointer-events: none; /* permet d'interagir avec les éléments */
    }

    html, body {
        min-height: 100vh;
    }
}