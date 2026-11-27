#!/usr/bin/env node
/**
 * Tina 자격증명이 있으면 어드민까지 함께 빌드하고, 없으면 사이트만 빌드한다.
 * Tina Cloud를 연결하기 전에도 배포가 깨지지 않게 하려는 장치다.
 */
import { spawnSync } from 'node:child_process';

const hasTina =
  Boolean(process.env.TINA_PUBLIC_CLIENT_ID) && Boolean(process.env.TINA_TOKEN);

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (hasTina) {
  run('npx', ['tinacms', 'build']);
} else {
  console.log(
    '[build] TINA_PUBLIC_CLIENT_ID / TINA_TOKEN 이 없어 어드민 빌드를 건너뜁니다. 사이트만 빌드합니다.'
  );
}

run('npx', ['astro', 'build']);
