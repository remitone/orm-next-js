class AuthenticationError extends Error {
  constructor(message: string = "Invalid credentials. Please try again.") {
    super(message);
    this.name = "AuthenticationError";
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export default AuthenticationError;
