export async function login(username, password) {
  if (!username || !password) return;

  try {
    const response = await fetch(
      'https://auth-api.tarleylana.repl.co/authorize',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password }),
      },
    );

    const data = await response.json();

    if (data.statusCode === 401) {
      return { error: 'Usuário não autorizado' };
    }

    return data;
  } catch (err) {
    return { error: 'Algo errado aconteceu, tente novamente.' };
  }
}
