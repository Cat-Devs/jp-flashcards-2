import {
  Engine,
  LanguageCode,
  OutputFormat,
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechCommandInput,
  TextType,
  VoiceId,
} from '@aws-sdk/client-polly';
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from './config';
import { logHelper } from './helpers/log';

export const textToSpeech = async (text: string | null | undefined) => {
  try {
    const input: SynthesizeSpeechCommandInput = {
      Engine: Engine.NEURAL,
      LanguageCode: LanguageCode.ja_JP,
      OutputFormat: OutputFormat.MP3,
      TextType: TextType.TEXT,
      VoiceId: VoiceId.Takumi,
      Text: text || '',
    };

    const pollyCommand = new SynthesizeSpeechCommand(input);

    const polly = new PollyClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });

    const response = await polly.send(pollyCommand);
    const byteArray = await response.AudioStream?.transformToByteArray();
    return byteArray && Array.from(byteArray);
  } catch (error) {
    logHelper('error', 'text-to-speech', error);
  }
};
