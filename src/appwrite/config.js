import conf from "../conf/conf";
import { ID, Client, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service::create post::error:", error);
    }
  }

  async updateDocument(ID, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("Appwrite service::update document::error:", error);
    }
  }

  async deletePost(ID) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID
      );
      return true;
    } catch (error) {
      console.log("Appwrite service::delete post::error", error);
      return false;
    }
  }

  async getPost(ID) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID
      );
    } catch (error) {
      console.log("Appwrite service :: get post :: error:", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error :", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: upload file :: error : ", error);
    }
  }

  async deleteFile(fileID) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileID);
      return true;
    } catch (error) {
      console.log("Appwrite service :: delete file :: error :", error);
    }
  }

  getFilePreview(fileID) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileID);
  }
}

const service = new Service();

export default service;
