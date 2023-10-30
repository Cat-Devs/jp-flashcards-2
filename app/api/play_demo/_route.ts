import { NextResponse } from 'next/server';
import {
  PollyClient,
  SynthesizeSpeechCommand,
  Engine,
  LanguageCode,
  OutputFormat,
  TextType,
  VoiceId,
  SynthesizeSpeechCommandInput,
} from '@aws-sdk/client-polly';
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from '@/lib/config';

export async function GET() {
  const polly = new PollyClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  const input: SynthesizeSpeechCommandInput = {
    Engine: Engine.NEURAL,
    LanguageCode: LanguageCode.ja_JP,
    OutputFormat: OutputFormat.MP3,
    TextType: TextType.TEXT,
    VoiceId: VoiceId.Takumi,
    Text: `tomodachi`,
  };

  const pollyCommand = new SynthesizeSpeechCommand(input);

  const response = await polly.send(pollyCommand);
  const arr = await response.AudioStream?.transformToByteArray();
  const arrayBuffer = (arr as Uint8Array).buffer;
  const blob = new Blob([arrayBuffer]);

  return new NextResponse(blob, {
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  });
}
