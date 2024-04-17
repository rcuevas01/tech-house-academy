import React, { useState, useRef, useEffect, FC } from 'react';
import { Button, Group, Stack, Text, TextInput, useMantineTheme, MantineProvider } from "@mantine/core";
import { audioInput } from "src/utils/validators";
import { newAudioUpload } from "src/server/util"
import { useForm, zodResolver } from "@mantine/form"; 
import WaveSurfer from 'wavesurfer.js';
import { api } from "src/utils/api";

interface AudioUploaderProps {
    audioInput: any;
  }
  
  const Audio: FC<AudioUploaderProps> = ({ audioInput }) => {
    const form = useForm({
      initialValues: {
        filename: "",
        filePath: ""
      },
    });

    const { mutate: createAudio } = api.audioFile.create.useMutation({
        onSuccess: (data) => {
           console.log(data)
        },
    });
  
    const [audioData, setAudioData] = useState<File | null>(null);
    const [audioName, setAudioName] = useState(String)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setAudioName(file.name)
      setAudioData(file)
    }
  };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={form.onSubmit(async (values) => {
          const x = await newAudioUpload(audioData, audioName)
          form.setFieldValue("filename", audioName)
          
          form.setFieldValue("filePath", x)
          createAudio(values)
        })}>
         
        <TextInput
          withAsterisk
          label="File Name"
          placeholder="My amazing mix"
          {...form.getInputProps("filename")}
        />

<div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {audioData && (
        <audio controls>
          <source src={audioData} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
    

  
       
        
  
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      </div>
    );
  };

export default Audio;