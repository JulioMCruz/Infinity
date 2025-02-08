import { SecretVaultWrapper } from './SecretVault/wrapper.js';
import { orgConfig } from './nillionOrgConfig.js';

// User Profile type definition
export interface UserProfile {
  userwallet: string;
  name: string;
  industry: string;
  description: string;
  merchantwalletaddress: string;
  tokenname: string;
  logo: string;
  banner: string;
}

// NillionAccess library class
class NillionAccess {
  // Function to check if a user exists in Nillion DB
  public static async checkUserExists(userWallet: string): Promise<boolean> {
    try {

        const SCHEMA_ID = String(process.env.NEXT_PUBLIC_NILLION_USER_PROFILE_SCHEMA_ID || '');
        if (!SCHEMA_ID.trim()) {
          throw new Error('Nillion schema ID is not set');
        }

        const collection = new SecretVaultWrapper(
            orgConfig.nodes,
            orgConfig.orgCredentials,
            SCHEMA_ID
        );


        console.log('🚀 ~ NillionAccess ~ checkUserExists ~ collection:', collection)

        await collection.init();
    
        const filterByUserWallet = {
        userwallet: userWallet,
        };    

        console.log('🚀 ~ NillionAccess ~ checkUserExists ~ filterByUserWallet:', filterByUserWallet)
    
        // Read the original record
        const readRecord = await collection.readFromNodes(filterByUserWallet);        
        //console.log('📚 Read original record:', readRecord);

        console.log('🚀 ~ NillionAccess ~ checkUserExists ~ readRecord:', readRecord)

        return readRecord.length > 0;

    } catch (error) {
      console.error('Error checking user existence:', error);
      throw error;
    }
  }

  // Function to create a new user profile in Nillion DB
  public static async createUserProfile(profile: UserProfile): Promise<boolean> {
    try {
      const SCHEMA_ID = String(process.env.NEXT_PUBLIC_NILLION_USER_PROFILE_SCHEMA_ID || '');
      if (!SCHEMA_ID.trim()) {
        throw new Error('Nillion schema ID is not set');
      }

      const collection = new SecretVaultWrapper(
        orgConfig.nodes,
        orgConfig.orgCredentials,
        SCHEMA_ID
      );
      await collection.init();

      const data = [
        {
            userwallet: profile.userwallet,
            name: { $allot: profile.name }, // will be encrypted to a $share
            industry: { $allot: profile.industry }, // will be encrypted to a $share
            description: { $allot: profile.description }, // will be encrypted to a $share
            merchantwalletaddress: { $allot: profile.merchantwalletaddress }, // will be encrypted to a $share
            tokenname: { $allot: profile.tokenname }, // will be encrypted to a $share
            logo: profile.logo ,
            banner: profile.banner,
        },
      ];      

      // Store the user profile data
      await collection.writeToNodes(data);
      
      console.log('✅ User profile created successfully');
      return true;

    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }
  // Funtion to read a user profile from Nillion DB
  public static async readUserProfile(userWallet: string): Promise<UserProfile> {
    try {
      // Implement the logic to read the user profile
      //console.log('🚀 ~ NillionAccess ~ readUserProfile ~ userWallet:', userWallet)

      const SCHEMA_ID = String(process.env.NEXT_PUBLIC_NILLION_USER_PROFILE_SCHEMA_ID || '');
      if (!SCHEMA_ID.trim()) {
        throw new Error('Nillion schema ID is not set');
      }

      const collection = new SecretVaultWrapper(
        orgConfig.nodes,
        orgConfig.orgCredentials,
        SCHEMA_ID
      );
      await collection.init();
  
      const filterByUserWallet = {
        userwallet: userWallet,
      };    
  
      // Read the original record
      const readOriginalRecord = await collection.readFromNodes(filterByUserWallet);
      //console.log('📚 Read original record:', readOriginalRecord);

      if (readOriginalRecord.length === 0) {
        throw new Error('User profile not found');
      }

      return readOriginalRecord[0] as UserProfile


    } catch (error) {
      console.error('Error reading user profile:', error)
      throw error
    }
  }

}

export default NillionAccess;
