import { Alert } from "react-native";
import {
  Account,
  Avatars,
  Client,
  ID,
  Databases,
  Storage,
  Query,
} from "react-native-appwrite";
import config from "./config.json" with { type: "json" };

console.log(config.databaseId);
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

const database = new Databases(client);

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountID: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    console.log(newUser);

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountID", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllPosts() {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videosCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLatestPosts() {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function searchPosts(query) {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserPosts(userID) {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.equal("creator", userID)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getFilePreview = async function (fileId, type) {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async function (file, type) {
  if (!file) return;

  const asset = {
    type: file.mimeType,
    name: file.fileName,
    size: file.fileSize,
    uri: file.uri,
  };

  console.log(asset);
  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export async function createVideo(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.thumbnail, "video"),
    ]);

    const newPost = await database.createDocument(
      config.databaseId,
      config.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );
    return newPost;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
