import { useEffect, useState } from 'react';
import { Snapshot, useGotoRecoilSnapshot, useRecoilSnapshot } from 'recoil';

let devTool: any = null;

interface RetainedSnapshot {
  release: Function;
  snapshot: Snapshot;
}

function RecoilObserver({
  env = 'development',
  exclude = [],
  name = 'Recoil State Observer',
  maxAge = 100,
  trace = false,
}: {
  env: string,
  exclude?: string[];
  name?: string;
  maxAge?: number;
  trace?: boolean;
}) {
  const [snapshots, setSnapshots] = useState<Array<RetainedSnapshot>>([]);
  const devToolsExtensions = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
  const gotoSnapshot = useGotoRecoilSnapshot();
  const snapshot: Snapshot = useRecoilSnapshot();
  let unsubscribe: any = null;
  const withDevTool = env === 'development'
      && typeof window !== 'undefined'
      && (window as any).__REDUX_DEVTOOLS_EXTENSION__;

  const connect = () => {
    if (!devTool) {
      setSnapshots([]);
      devTool = devToolsExtensions?.connect({
        name,
        maxAge,
        trace,
      });
    }
  };

  const dispatch = (isModified: boolean) => {
    let save = false;

    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE({ isModified })) {
      const { contents, state } = snapshot.getLoadable(node);
      const { key } = node;

      if (state === 'hasValue' && !key.includes('__withCallback') && !exclude.includes(key)) {
        const action = {
          type: key,
          payload: { node, value: contents, snapshotId: snapshot.getID() },
        };

        devTool?.send(action.type, action);
        save = true;
      }
    }

    if (save && snapshots?.every(({ snapshot: s }) => s.getID() !== snapshot.getID())) {
      setSnapshots([...snapshots, { release: snapshot.retain(), snapshot }]);
    }
  };

  useEffect(() => {
    if (withDevTool) {
      connect();
      devTool?.init('init', null);
      dispatch(false);
    }

    return () => {
      if (withDevTool) {
        unsubscribe?.();
        devToolsExtensions?.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (withDevTool) {
      connect();

      if (!unsubscribe) {
        unsubscribe = devTool?.subscribe(({ type, payload, state }: any) => {
          if (type !== 'START' && payload.type === 'JUMP_TO_ACTION') {
            const {
              payload: { snapshotId },
            } = JSON.parse(state);

            snapshots.forEach(({ snapshot: s }) => {
              if (s.getID() === snapshotId) {
                gotoSnapshot(s);
              }
            });
          }
        });
      }

      dispatch(true);
    }
  }, [snapshot]);

  return null;
}

export default RecoilObserver;
