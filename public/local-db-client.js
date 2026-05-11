(function () {
    class QueryBuilder {
        constructor(table) {
            this.table = table;
            this.operation = null;
            this.payload = null;
            this.columns = '*';
            this.filters = [];
            this.sort = null;
            this.maxRows = null;
            this.singleMode = false;
            this.conflict = null;
        }

        select(columns = '*') {
            this.operation = this.operation || 'select';
            this.columns = columns;
            return this;
        }

        insert(payload) {
            this.operation = 'insert';
            this.payload = payload;
            return this;
        }

        update(payload) {
            this.operation = 'update';
            this.payload = payload;
            return this;
        }

        upsert(payload, options = {}) {
            this.operation = 'upsert';
            this.payload = payload;
            this.conflict = options.onConflict || null;
            return this;
        }

        delete() {
            this.operation = 'delete';
            return this;
        }

        eq(column, value) {
            this.filters.push({ column, op: 'eq', value });
            return this;
        }

        order(column, options = {}) {
            this.sort = { column, ascending: options.ascending !== false };
            return this;
        }

        limit(count) {
            this.maxRows = count;
            return this;
        }

        maybeSingle() {
            this.singleMode = true;
            return this.execute();
        }

        then(resolve, reject) {
            return this.execute().then(resolve, reject);
        }

        async execute() {
            try {
                const response = await fetch('/api/query', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        table: this.table,
                        operation: this.operation || 'select',
                        payload: this.payload,
                        columns: this.columns,
                        filters: this.filters,
                        order: this.sort,
                        limit: this.maxRows,
                        single: this.singleMode,
                        onConflict: this.conflict
                    })
                });
                const body = await response.json().catch(() => ({}));
                if (!response.ok) return { data: null, error: body.error || { message: response.statusText } };
                return { data: body.data, error: null };
            } catch (error) {
                return { data: null, error };
            }
        }
    }

    window.supabaseClient = {
        from(table) {
            return new QueryBuilder(table);
        },
        async rpc(name, params) {
            try {
                const response = await fetch(`/api/rpc/${encodeURIComponent(name)}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(params || {})
                });
                const body = await response.json().catch(() => ({}));
                if (!response.ok) return { data: null, error: body.error || { message: response.statusText } };
                return { data: body.data, error: null };
            } catch (error) {
                return { data: null, error };
            }
        }
    };
})();
