#!/bin/bash
cat << 'INNER_EOF' > patch.txt
            {sendSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" /> 
                <span>Successfully dispatched all 3 emails in sequence to {recipientEmail}!</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between gap-3 relative z-10">
          <button
INNER_EOF

# Find where `type="button"` is after sendSuccess, we know line 622 is `type="button"` now.
sed -i -e '/{sendSuccess && (/,/)}/!b' -e '/)}/!d' -e '/)}/r patch.txt' -e '/)}/d' src/components/EmailModal.tsx
