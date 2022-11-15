# Updating

Ran this:
```
$ DESTDIR=dest_dir; LOGDIR=src_dir; find $LOGDIR -name *.csv | sed -E "s|^$LOGDIR(.*)\$|mkdir -p \"\$(dirname $DESTDIR\1)\" \&\& cp $LOGDIR\1 $DESTDIR\1|g" > update_logs.sh && bash update_logs.sh
```
