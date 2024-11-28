import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://api.assemblyai.com/v2";

const useTranscription = (apiKey: string) => {
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [transcriptionId, setTranscriptionId] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const uploadAudio = async (audioFile: File) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", audioFile);

      const { data } = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          authorization: apiKey,
        },
      });

      setUploadUrl(data.upload_url);
      return data.upload_url;
    } catch (err: any) {
      setError("Error al subir el archivo de audio. (╯°□°)╯︵ ┻━┻");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const requestTranscription = async (audioUrl: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/transcript`,
        {
          audio_url: audioUrl,
        },
        {
          headers: {
            authorization: apiKey,
          },
        }
      );

      setTranscriptionId(data.id);
      return data.id;
    } catch (err: any) {
      setError("Error al solicitar la transcripción. (；￣Д￣)");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTranscription = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/transcript/${id}`, {
        headers: {
          authorization: apiKey,
        },
      });

      if (data.status === "completed") {
        setTranscription(data.text);
      } else if (data.status === "failed") {
        setError("La transcripción falló. (ಥ﹏ಥ)");
      } else {
        setError("La transcripción está en proceso. 🕒");
      }
    } catch (err: any) {
      setError("Error al obtener la transcripción. (⊙_☉)");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  

  return {
    uploadAudio,
    requestTranscription,
    fetchTranscription,
    uploadUrl,
    transcriptionId,
    transcription,
    loading,
    error,
  };
};

export default useTranscription;
