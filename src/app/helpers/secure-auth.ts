export class SecureAuth {
   encryptUsingAES256(plainText: any) {
      return btoa(plainText);
   }

   decryptUsingAES256(encryptedText: any) {
      return atob(encryptedText);
   }

   getAuthToken() {
      let token = sessionStorage.getItem('token');
      if (token) {
         return token
      } else {
         return "";
      }
   }
}