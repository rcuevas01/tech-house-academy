// import React, { useState, useRef, useEffect, FC } from 'react';
// import { Button, Group, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
// import { audioInput } from "src/utils/validators";
// import { useForm, zodResolver } from "@mantine/form"; 
// import WaveSurfer from 'wavesurfer.js';
// import { api } from "src/utils/api";

// interface AudioUploaderProps {
//   audioInput: any; // Define the type of audioInput
// }

// export const AudioUploader: FC<AudioUploaderProps> = ({audioInput}) => {

  
//   const [audioFile, setAudioFile] = useState<File | null>(null);
//   const [startPosition, setStartPosition] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const waveformRef = useRef<HTMLDivElement>(null);
//   const wavesurfer = useRef<WaveSurfer | null>(null);

//   const { mutate: uploadAudio } = api.audioFile.create.useMutation( {

//   })

//   const { getInputProps, onSubmit, setValues, isDirty, resetDirty, values, errors } = useForm({
//     initialValues: {
//       fileName: 
        
//     },
//     validate: zodResolver(audioInput),
// });


//   useEffect(() => {
//     if (audioFile) {
//       wavesurfer.current = WaveSurfer.create({
//         container: waveformRef.current,
//         waveColor: '#4F4A85',
//         progressColor: '#383351',
//         cursorColor: 'purple',
//         barWidth: 2,
//         barHeight: 2,
//         height: 100,
//         responsive: true,
//       });
      
//       wavesurfer.current.on('click', () => {
//         wavesurfer.current!.play()
//         setIsPlaying(true)
//       })
//       // Load audio file
//       wavesurfer.current.load(audioFile.src);

//       // Handle wavesurfer progress event
//       wavesurfer.current.on('audioprocess', () => {
//         // Update start position
//         setStartPosition(wavesurfer.current.getCurrentTime());
//       });

//       // Handle audio element timeupdate event
//       const handleAudioTimeUpdate = () => {
//         // Update WaveSurfer position
//         wavesurfer.current.seekTo(audioRef.current.currentTime / audioFile.duration);
//       };
//       audioRef.current.addEventListener('timeupdate', handleAudioTimeUpdate);

//       return () => {
//         // Clean up event listeners
//         audioRef.current.removeEventListener('timeupdate', handleAudioTimeUpdate);
//       };
//     }
//   }, [audioFile]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const audio = new Audio(URL.createObjectURL(file));
//       setAudioFile(audio);
//     }
//   };

//   const handleStartPositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const position = parseInt(event.target.value, 10);
//     setStartPosition(position);
//     if (audioRef.current) {
//       audioRef.current.currentTime = position;
//     }
//     if (wavesurfer.current) {
//       wavesurfer.current.seekTo(position / audioFile!.duration);
//     }
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', audioFile);

//     try {
//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       // Handle response from the server (e.g., show success message)
//     } catch (error) {
//       // Handle error
//     }
//   };

//   const handleTogglePlay = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         wavesurfer.current!.pause()
//       } else {
//         wavesurfer.current!.play()
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     if (file) {
//       const audio = new Audio(URL.createObjectURL(file));
//       setAudioFile(audio);
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//   };

//   const handleRectangleClick = () => {
//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.accept = 'audio/*';
//     fileInput.onchange = (e) => handleFileChange(e as React.ChangeEvent<HTMLInputElement>);
//     fileInput.click();
//   };

//   return (
//     <form
//                 onSubmit={onSubmit((formValues) => {
//                     if (isDirty()) {
//                         if (restaurant) {
//                             updatedRestaurant({ ...formValues, id: restaurant?.id });
//                         } else {
//                             createRestaurant(formValues);
//                         }
//                     } else {
//                         onClose();
//                     }
//                 })}
//             >
//     <div className="flex justify-center items-center h-screen bg-black">
//       {audioFile ? (
//         <div>
//           <div ref={waveformRef} className="w-full" />
//           <h2 className="text-white">Choose playback start position:</h2>
          
         
//           <button onClick={handleTogglePlay} className="text-white">{isPlaying ? 'Pause' : 'Play'}</button>
//           <audio ref={audioRef} src={audioFile.src} controls={false} style={{ display: 'none' }} />
//           <button onClick={handleUpload}>Upload</button>
//         </div>
//       ) : (
//         <div
//           className="border-4 border-dashed border-gray-400 rounded-lg p-4 h-64 w-96 cursor-pointer transition duration-300 hover:bg-gray-800"
//           onClick={handleRectangleClick}
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//         >
//           <p className="text-white text-center">Upload your audio file here</p>
//           <input type="file" accept="audio/*" onChange={handleFileChange} style={{ display: 'none' }} />
//         </div>
//       )}
//     </div>
//     </form>
//   );
// };

// export default AudioUploader;