const BASE_URL = process.env.BACKEND_URL;

export class ApiRoute {
  private static baseUrl: string = `${BASE_URL}/api`;

  /**
   * SignIn endpoint
   * @POST Sign in user
   * @returns http://localhost:8000/api/auth/signin
   */
  public static signIn = () => `${this.baseUrl}/auth/signin`;
  /**
   * SignUp endpoint
   * @POST Register new user
   * @returns http://localhost:8000/api/auth/signup
   */
  public static signUp = () => `${this.baseUrl}/auth/signup`;
  /**
   * Refresh Token endpoint
   * @POST Generate new access token
   * @returns http://localhost:8000/api/auth/refresh-token
   */
  public static refreshToken = () => `${this.baseUrl}/auth/refresh-token`;
  /**
   * Check Availability endpoint
   * @param id string
   * @param email string
   * @returns http://localhost:8000/api/auth/check-availability
   */
  public static checkAvailability = () => {
    return `${this.baseUrl}/auth/check-availability`;
  };

  public static users = () => `${this.baseUrl}/users`;
  /**
   * User endpoint
   * @GET Get user
   * @PATCH Update user
   * @DELETE Delete user
   * @param userId string
   * @returns http://localhost:8000/api/users/{userId}
   */
  public static usersById = (userId: string) =>
    `${this.baseUrl}/users/${userId}`;
  /**
   * User endpoint
   * @GET Get user overview
   * @returns http://localhost:8000/api/users/{userId}/overview
   */
  public static userOverview = (userId: string) =>
    `${this.baseUrl}/users/${userId}/overview`;

  /**
   * User endpoint
   * @POST Create or update user contacts
   * @GET Find user contacts
   * @returns http://localhost:8000/api/users/{userId}/contacts
   */
  public static userContacts = (userId: string) =>
    `${this.baseUrl}/users/${userId}/contacts`;
  /**
   * User endpoint
   * @GET Find user contacts
   * @returns http://localhost:8000/api/users/{userId}/ongoing-presences
   */
  public static userOngoingPresences = (userId: string) =>
    `${this.baseUrl}/users/${userId}/ongoing-presences`;
  /**
   * User Classes endpoint
   * @GET Get user classes
   * @POST Join new class
   * @param userId string
   * @returns http://localhost:8000/api/users/{userId}/classes
   */
  public static usersClasses = (userId: string) =>
    `${this.baseUrl}/users/${userId}/classes`;
  /**
   * User Presences endpoint
   * @GET Get user presences
   * @param userId string
   * @returns http://localhost:8000/api/users/{userId}/user-presences
   */
  public static userPresences = (userId: string) =>
    `${this.baseUrl}/users/${userId}/user-presences`;

  /**
   * Classes endpoint
   * @POST Create new class
   * @returns http://localhost:8000/api/classes
   */
  public static classes = () => `${this.baseUrl}/classes`;
  /**
   * Class endpoint
   * @GET Get class
   * @PATCH Update class
   * @DELETE remove class
   * @param slug string
   * @returns http://localhost:8000/api/classes/{slug}
   */
  public static classBySlug = (slug: string) =>
    `${this.baseUrl}/classes/${slug}`;

  /**
   * Class presences endpoint
   * @GET Get class presences
   * @POST Create class presence
   * @param classId string
   * @returns http://localhost:8000/api/classes/{classId}/presences
   */
  public static classPresences = (classId: string) =>
    `${this.baseUrl}/classes/${classId}/presences`;
  /**
   * Class presence endpoint
   * @GET Get class presence
   * @POST Make attendance in
   * @PATCH Update class presence
   * @DELETE Remove class presence
   * @param classId string
   * @param presencesId string
   * @returns http://localhost:8000/api/classes/{classId}/presences/{presencesId}
   */
  public static classPresenceById = (classId: string, presenceId: string) =>
    `${this.baseUrl}/classes/${classId}/presences/${presenceId}`;
  /**
   * Class barcode presence endpoint
   * @POST Create class presence barcode
   * @param classId string
   * @param presencesId string
   * @returns http://localhost:8000/api/classes/{classId}/presences/{presencesId}/barcodes
   */
  public static generatePresenceBarcode = (
    classId: string,
    presenceId: string,
  ) => `${this.baseUrl}/classes/${classId}/presences/${presenceId}/barcodes`;

  /**
   * Health endpoint
   * @GET Check health status
   * @returns http://localhost:8000/api/classes/{classId}/presences/{presencesId}
   */
  public static health = () => `${this.baseUrl}/health`;
}
