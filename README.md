# Mural Pay Assignment

Assignment for my Mural Pay application, built with Next.

## Some considerations

For simplicity, login and logout features had been added. In this way, it is possible to login only by providing the `customerId` (the password field can be left empty or any random thing can be provided, it is ignored anyway).

A custom hook to manage the customer's context was used to avoid excesive prop drilling. It is in `@src/hooks` as other hooks provided by shadcn. 

In `@src/api` you can find an axios interceptor in which the API_KEY is set as a header before every api call. The folder `/services` contains all necessary calls to the api and `/types` contains all the types used through out the code.

Finally, in the `@src/views` folder you can see a component rendering a view for every page.
