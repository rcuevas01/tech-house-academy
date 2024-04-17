import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";
import AWS from "aws-sdk";
import { Amplify } from 'aws-amplify'
import { uploadData, getProperties, getUrl } from 'aws-amplify/storage';
import awsconfig from 'src/aws-exports'
import formidable from "formidable";
import { randomUUID } from "crypto";

Amplify.configure(awsconfig)

export const newAudioUpload = async (audioFile: any, audioName: string) => {
  try {
    const result = uploadData({
      key: audioName,
      data: audioFile
    }).result;
    console.log('Succeeded: ', result);
    
  } catch (error) {
    console.log('Error : ', error);
  }

  const getUrlResult = await getUrl({
    key: audioName,
    options: {
      accessLevel: 'guest' , 
    },
  });
  return getUrlResult.url.toString()


}
 